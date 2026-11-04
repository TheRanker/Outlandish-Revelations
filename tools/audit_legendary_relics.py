"""Portable audit of native relic packaging and memorial data; never simulates a ceremony."""
from pathlib import Path
import hashlib
import json
import struct
import zipfile
from structure_nbt import loads
from classfile import ClassFile

ROOT = Path(__file__).resolve().parents[1]
RESOURCES = ROOT / 'compat/relics-resources'


def audit():
    spec = json.loads((ROOT / 'compat/native-artifact.json').read_text(encoding='utf-8'))
    artifact = ROOT / spec['path']
    assert spec['version'] == '1.2.8'
    assert hashlib.sha256(artifact.read_bytes()).hexdigest() == spec['sha256']
    config = json.loads((ROOT / 'kubejs/outlandish/legendary_relics.json').read_text(encoding='utf-8'))
    assert config['enabled'] is False, 'Untested native gameplay stays disabled in development defaults'
    roster = json.loads((ROOT / 'docs/npc-arcs.json').read_text(encoding='utf-8'))['npcs']
    assert config['npcAdvancements'] == {n['id']: n['completion_advancement'] for n in roster}
    assert len(set(config['npcAdvancements'].values())) == 12
    for advancement in config['npcAdvancements'].values():
        namespace, path = advancement.split(':', 1)
        assert (ROOT / f'kubejs/data/{namespace}/advancements/{path}.json').is_file()
    old = json.loads((ROOT / 'kubejs/outlandish/world_remembers.json').read_text(encoding='utf-8'))
    assert old['ceremonyIntegrationEnabled'] is False and old['memorials'] == []

    resources = [p for p in RESOURCES.rglob('*') if p.is_file()]
    documents = {p.relative_to(RESOURCES).as_posix(): json.loads(p.read_text(encoding='utf-8'))
                 for p in resources if p.suffix == '.json'}
    placement = documents['data/outlandish/worldgen/structure_set/ranker_memorial.json']
    assert placement['structures'] == [{'structure': 'outlandish:ranker_memorial', 'weight': 1}]
    spread = placement['placement']
    assert spread['type'] == 'minecraft:random_spread' and spread['spacing'] == 100
    assert 0 <= spread['separation'] < spread['spacing'] and 0 <= spread['salt'] <= 2147483647
    for p in (ROOT / 'kubejs/data/outlandish/worldgen/structure_set').glob('*.json'):
        assert json.loads(p.read_text())['placement'].get('salt') != spread['salt']
    structure = documents['data/outlandish/worldgen/structure/ranker_memorial.json']
    assert structure['type'] == 'minecraft:jigsaw' and structure['biomes'] == '#outlandish:memorial_spawnable'
    assert structure['start_pool'] == 'outlandish:ranker_memorial' and 1 <= structure['max_distance_from_center'] <= 128
    pool = documents['data/outlandish/worldgen/template_pool/ranker_memorial.json']
    assert pool['elements'][0]['element']['location'] == 'outlandish:ranker_memorial'
    assert pool['elements'][0]['element']['projection'] == 'rigid'
    biomes = documents['data/outlandish/tags/worldgen/biome/memorial_spawnable.json']['values']
    assert biomes and all(b.startswith('minecraft:') for b in biomes)
    for tag in ['bypasses_armor', 'bypasses_resistance', 'bypasses_enchantments', 'bypasses_cooldown']:
        assert documents[f'data/minecraft/tags/damage_type/{tag}.json'] == {
            'replace': False, 'values': ['outlandish:relic_echo']}
    assert not (RESOURCES / 'data/minecraft/tags/damage_type/bypasses_invulnerability.json').exists()

    _, nbt = loads((RESOURCES / 'data/outlandish/structures/ranker_memorial.nbt').read_bytes())
    size = nbt['size'][1][1]
    palette = nbt['palette'][1][1]
    assert size == [31, 22, 35] and not nbt['entities'][1][1]
    blocks = {}
    for block in nbt['blocks'][1][1]:
        pos = tuple(block['pos'][1][1])
        assert pos not in blocks and all(0 <= v < bound for v, bound in zip(pos, size))
        index = block['state'][1]
        assert 0 <= index < len(palette)
        blocks[pos] = (palette[index], block.get('nbt', (10, {}))[1])
    anchor, data = blocks[15, 2, 20]
    assert anchor['Name'][1] == 'minecraft:barrel'
    assert anchor['Properties'][1]['facing'][1] == 'north'
    assert data['Lock'][1] == 'outlandish_memorial_anchor'
    assert data['ForgeData'][1]['outlandishMemorialAnchor'][1] == 1
    assert blocks[15, 4, 20][0]['Name'][1] == 'bloodmagic:altar'
    for x in range(14, 17):
        for y in range(5, 7):
            assert blocks[x, y, 27][0]['Name'][1] == 'minecraft:dark_oak_planks'
    assert sum(data.get('ForgeData', (10, {}))[1].get('outlandishMemorialAnchor', (1, 0))[1]
               for _, data in blocks.values()) == 1

    classes = 0
    with zipfile.ZipFile(artifact) as jar:
        assert jar.testzip() is None and len(jar.namelist()) == len(set(jar.namelist()))
        for p in resources:
            expected = p.read_bytes()
            if p.suffix in {'.json', '.js'}:
                expected = expected.replace(b'\r\n', b'\n')
            assert jar.read(p.relative_to(RESOURCES).as_posix()) == expected, p
        assert b'version="1.2.8"' in jar.read('META-INF/mods.toml')
        coremods = json.loads(jar.read('META-INF/coremods.json'))
        assert coremods['outlandish_legendary_knife'] == 'coremods/legendary_knife.js'
        for name in jar.namelist():
            if not name.startswith('com/theranker/creativeguard/relics/') or not name.endswith('.class'):
                continue
            data = jar.read(name)
            assert int.from_bytes(data[6:8], 'big') == 61, (name, 'Expected Java 17 bytecode')
            if not name.rsplit('/', 1)[1].startswith('RelicClient'):
                assert not any(isinstance(v, str) and ('net/minecraft/client/' in v or 'net/minecraftforge/client/' in v)
                               for v in ClassFile(data).cp), name
            classes += 1
        assert classes >= 18
    namespace, skin = config['skinTexture'].split(':', 1)
    skin_file = RESOURCES / f'assets/{namespace}/{skin}'
    skin_present = skin_file.is_file()
    original_skin = json.loads((ROOT / 'tools/data/ranker_skin.json').read_text(encoding='utf-8'))
    assert original_skin['resource'] == config['skinTexture'] and original_skin['preserveExactBytes'] is True
    assert skin_present, 'The supplied original Ranker skin must be bundled'
    skin_bytes = skin_file.read_bytes()
    assert hashlib.sha256(skin_bytes).hexdigest() == original_skin['sha256'], 'Original Ranker skin changed'
    assert skin_bytes[:8] == b'\x89PNG\r\n\x1a\n'
    assert struct.unpack('>II', skin_bytes[16:24]) == (original_skin['width'], original_skin['height']) == (64, 64)
    assert original_skin['model'] == 'classic' and config['slimSkin'] is False
    print(f'Native relic packaging audit passed: {classes} Java 17 classes, {len(documents)} JSON resources, '
          f'{len(blocks)} memorial blocks, twelve personal links, matching JAR resources and disabled defaults. '
          f'Original Ranker skin supplied: {skin_present}. No gameplay was run.')
    return {'classes': classes, 'json_resources': len(documents), 'memorial_blocks': len(blocks),
            'skin_present': skin_present}


if __name__ == '__main__':
    audit()
