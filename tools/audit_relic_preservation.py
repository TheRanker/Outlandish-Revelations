"""Protect original relic assets and behavior while the new system is developed."""
from pathlib import Path
import hashlib
import json
import re
import struct

ROOT = Path(__file__).resolve().parents[1]


def audit():
    baseline = json.loads((ROOT / 'tools/data/relic_preservation.json').read_text(encoding='utf-8'))
    assert baseline['version'] == 1
    for name, expected in baseline['sha256'].items():
        assert hashlib.sha256((ROOT / name).read_bytes()).hexdigest() == expected, ('Original relic file changed', name)
    sword = (ROOT / 'kubejs/assets/kubejs/textures/item/rankers_sword.png').read_bytes()
    assert sword[:8] == b'\x89PNG\r\n\x1a\n'
    assert struct.unpack('>II', sword[16:24]) == (24, 144)
    animation = json.loads((ROOT / 'kubejs/assets/kubejs/textures/item/rankers_sword.png.mcmeta').read_text(encoding='utf-8'))['animation']
    assert set(animation['frames']) == set(range(6))
    assert animation['frames'] == [0, 1, 2, 3, 4, 5, 4, 3, 2, 1]
    assert animation['frametime'] == 4 and animation['interpolate'] is True
    source = (ROOT / 'kubejs/startup_scripts/outlandish_custom_content.js').read_text(encoding='utf-8')
    match = re.search(r"e\.create\(['\"]rankers_sword['\"],\s*['\"]sword['\"]\)(.*?)\}\)", source, re.S)
    assert match, 'Missing original sword registration'
    chain = match[1]
    for expression in [r"\.tier\('netherite'\)", r'\.attackDamageBaseline\(17\.5\)',
                       r'\.speedBaseline\(5\)', r'\.maxDamage\(0\)']:
        assert re.search(expression, chain), ('Original sword property changed', expression)
    match = re.search(r'event\.modify\("kubejs:rankers_ring",\s*item\s*=>\s*\{(.*?)\}\)', source, re.S)
    assert match, 'Missing original ring modification'
    for expression in [r'item\.maxStackSize\s*=\s*1', r'item\.fireResistant\s*=\s*true', r'item\.rarity\s*=\s*"EPIC"']:
        assert re.search(expression, match[1]), ('Original ring property changed', expression)
    for name in ['rankers_sword', 'rankers_ring']:
        assert not (ROOT / f'kubejs/assets/kubejs/models/item/{name}.json').exists(), ('Unexpected replacement relic model', name)
    registry = json.loads((ROOT / 'docs/npc-arcs.json').read_text(encoding='utf-8'))['npcs']
    assert len(registry) == len({n['completion_advancement'] for n in registry}) == 12
    for npc in registry:
        namespace, path = npc['completion_advancement'].split(':', 1)
        assert (ROOT / 'kubejs/data' / namespace / 'advancements' / (path + '.json')).is_file()
    modules = (ROOT / 'config/apotheosis/apotheosis.cfg').read_text(encoding='utf-8-sig')
    status = {name: re.search(r'B:"Enable ' + name + r' Module"=(true|false)', modules)[1]
              for name in ['Enchantment', 'Adventure']}
    print('Relic preservation audit passed: four original file hashes, six sword frames, '
          'item properties, generated-model boundary and twelve personal story resources. '
          f'Apotheosis modules: {status}. This does not test new relic features.')
    return status


if __name__ == '__main__':
    audit()
