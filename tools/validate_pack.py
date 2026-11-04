"""Portable standard-library validation of the checked-in pack overrides."""
from collections import defaultdict
from pathlib import Path
import json
import hashlib
import re
import zipfile
from snbt import load
from structure_nbt import loads

ROOT=Path(__file__).resolve().parents[1]
def walk(value):
    yield value
    if isinstance(value,dict):
        for child in value.values():yield from walk(child)
    elif isinstance(value,list):
        for child in value:yield from walk(child)
def normal(value):
    return f'{value & ((1<<64)-1):016X}' if isinstance(value,int) else str(value).upper().zfill(16)

def validate():
    ids=defaultdict(list);quests=[];tables={};json_count=0;snbt_count=0
    for folder in ('kubejs/data','kubejs/outlandish','patchouli_books'):
        for file in (ROOT/folder).rglob('*.json'):
            json.loads(file.read_text(encoding='utf-8-sig'));json_count+=1
    for file in (ROOT/'config/ftbquests/quests').rglob('*.snbt'):
        value,_=load(file);snbt_count+=1
        for obj in walk(value):
            if isinstance(obj,dict) and re.fullmatch('[0-9A-Fa-f]{16}',str(obj.get('id',''))):ids[normal(obj['id'])].append(str(file.relative_to(ROOT)))
        if file.parent.name=='chapters':quests.extend(value.get('quests',[]))
        if file.parent.name=='reward_tables':tables[normal(value['id'])]=value
    assert all(len(paths)==1 for paths in ids.values()),'Duplicate FTB object ID'
    for quest in quests:
        for dependency in quest.get('dependencies',[]):assert normal(dependency) in ids,('Missing prerequisite',quest['id'],dependency)
        for reward in quest.get('rewards',[]):
            if reward.get('type')=='loot':assert normal(reward.get('table_id','')) in tables,('Missing reward table',quest['id'])
    policies=json.loads((ROOT/'tools/data/reward_pools.json').read_text())
    signatures=set();pools={}
    safe_vanilla={'torch','coal','copper_ingot','cooked_porkchop','iron_ingot','redstone','glass','gold_ingot',
        'lapis_lazuli','paper','amethyst_shard','stone','bone_meal','oak_log','cobblestone','wheat','leather',
        'clay_ball','baked_potato','oak_planks'}
    for name,policy in policies.items():
        table,_=load(ROOT/f'config/ftbquests/quests/reward_tables/{name}.snbt')
        assert table['id']==policy['id'] and table['loot_size']==1,('Reward identity/draw count changed',name)
        rows=table['rewards'];assert len(rows)==4
        assert rows==[{'count':count,'item':item} for item,count in policy['rewards']],('Reward policy mismatch',name)
        for row in rows:
            namespace,item=row['item'].split(':')
            assert (namespace=='minecraft' and item in safe_vanilla) or (namespace=='botania' and item in {
                'white_mystical_flower','light_blue_mystical_flower','yellow_mystical_flower','red_mystical_flower'}),('Progression-key reward not permitted',name,row)
            assert isinstance(row['count'],int) and 1<=row['count']<=64
        signatures.add(tuple(sorted((row['item'],row['count']) for row in rows)))
        pools[name]={row['item']:row['count'] for row in rows}
    assert len(signatures)==len(policies)==17,'Reward pools accidentally became identical again'
    for lower,higher in [('rare','epic'),('epic','legendary')]:
        assert pools[lower].keys()==pools[higher].keys()
        assert all(pools[higher][item]>amount for item,amount in pools[lower].items()),'Higher rarity must increase every material stack'
    links=json.loads((ROOT/'kubejs/data/quest_giver/quest_line_links.json').read_text(encoding='utf-8'))
    names=json.loads((ROOT/'kubejs/data/quest_giver/quest_line_names.json').read_text(encoding='utf-8'))['names']
    assert len(links)==len(set(names))==12
    assert {link['quest_line_id'] for link in links}==set(names)
    registry=json.loads((ROOT/'docs/npc-arcs.json').read_text(encoding='utf-8'))
    total_npc=0
    for npc in registry['npcs']:
        folder=ROOT/'kubejs/data/quest_giver/quest_lines'/npc['id']
        for filename in ('root.json','end.json'):
            value=json.loads((folder/filename).read_text(encoding='utf-8-sig'))
            assert all(value['start'][key].get('translate') for key in ('title','description'))
        files=sorted(folder.glob('quest_*.json'));assert files
        for i,file in enumerate(files,1):
            value=json.loads(file.read_text(encoding='utf-8-sig'));total_npc+=1
            assert value['parent']==('quest_giver:root' if i==1 else f'quest_giver:quest_{i-1:02}')
            assert not value.get('repeatable',False)
            assert value.get('tasks')
            assert all(value[part][key].get('translate') for part in ('start','complete') for key in ('title','description'))
        advancement=npc['completion_advancement']
        assert sum(task.get('advancement')==advancement for q in quests for task in q.get('tasks',[]))==1
        linked=[task for q in quests for task in q.get('tasks',[]) if task.get('advancement')==advancement]
        assert normal(linked[0]['id'])==normal(npc['ftb_task_id']),('NPC index task ID is stale',npc['id'])
        namespace,name=advancement.split(':')
        assert (ROOT/f'kubejs/data/{namespace}/advancements/{name}.json').exists()
        completion=ROOT/f'kubejs/data/outlandish/functions/story/{npc["id"]}/complete.mcfunction'
        assert ('advancement grant @s only '+advancement) in completion.read_text()
    assert total_npc==81
    config=json.loads((ROOT/'kubejs/outlandish/world_remembers.json').read_text())
    assert config['ceremonyIntegrationEnabled'] is False and config['memorials']==[],'Missing ceremony must stay disabled/unplaced in development defaults'
    biome=json.loads((ROOT/'kubejs/data/outlandish/tags/worldgen/biome/nether_npc_spawnable.json').read_text())
    assert 'incendium:infernal_dunes' not in biome['values']
    aura=json.loads((ROOT/'kubejs/data/outlandish/worldgen/structure_set/aura_research_station.json').read_text())['placement']
    assert aura['type']=='minecraft:concentric_rings' and aura['distance']>=64
    placement_salts=set()
    for file in (ROOT/'kubejs/data/outlandish/worldgen/structure_set').glob('*.json'):
        placement=json.loads(file.read_text())['placement']
        salt=placement.get('salt')
        assert type(salt) is int and 0<=salt<=2147483647,('Missing or invalid structure placement salt',file)
        assert salt not in placement_salts,('Duplicate NPC placement salt',file)
        placement_salts.add(salt)
    native=json.loads((ROOT/'compat/native-artifact.json').read_text())
    native_jar=ROOT/native['path']
    assert hashlib.sha256(native_jar.read_bytes()).hexdigest()==native['sha256'],'Native artifact hash mismatch'
    with zipfile.ZipFile(native_jar) as z:
        assert z.testzip() is None
        assert 'com/theranker/creativeguard/WorldRemembersBridge.class' in z.namelist()
    manifest=json.loads((ROOT/'manifest.json').read_text())
    assert manifest['minecraft']['version']=='1.20.1' and manifest['overrides']=='overrides'
    assert len({(entry['projectID'],entry['fileID']) for entry in manifest['files']})==len(manifest['files'])
    assert not any(e['projectID']==native['replacesProjectID'] for e in manifest['files']),'Old native mod download would duplicate bundled override'
    inventory=json.loads((ROOT/'docs/dependency-inventory.json').read_text(encoding='utf-8'))
    assert not any(e['filename'].lower().startswith('jeioptimizer-') for e in inventory),'Incompatible JEIOptimizer must remain excluded'
    pins={(e['projectID'],e['fileID']) for e in manifest['files']}
    assert {(e['projectID'],e['fileID']) for e in inventory if 'projectID' in e}==pins
    assert sum(e.get('distribution')=='bundled_override' for e in inventory)==1
    handbook=ROOT/'patchouli_books/outlandish_player_handbook'
    for file in (handbook/'en_us/entries').rglob('*.json'):
        entry=json.loads(file.read_text(encoding='utf-8-sig'))
        assert (handbook/'en_us/categories'/((entry['category'].split(':',1)[1])+'.json')).is_file(),file
    scroll=next(q for q in quests if q['id']=='5A34DFABE4AC44E0')
    assert scroll['can_repeat']==1 and 'repeatable' not in scroll
    assert scroll['rewards'][0]['item']=='quest_giver:quest_scroll'
    for archive in (ROOT/'config/paxi').rglob('*.zip'):
        with zipfile.ZipFile(archive) as z:assert z.testzip() is None,archive
    nbt_count=0
    def structure(data):
        nonlocal nbt_count
        _,value=loads(data);size=value['size'][1][1];palette=value['palette'][1][1]
        for block in value['blocks'][1][1]:
            assert all(0<=n<bound for n,bound in zip(block['pos'][1][1],size))
            assert 0<=block['state'][1]<len(palette)
        nbt_count+=1
    for file in (ROOT/'kubejs/data/outlandish/structures').glob('*.nbt'):structure(file.read_bytes())
    with zipfile.ZipFile(ROOT/'config/paxi/datapacks/outlandish_garrick_worldgen_v3.zip') as z:
        structure(z.read('data/outlandish/structures/garrick_ruin.nbt'))
    assert nbt_count==12
    print(f'Validated {json_count} JSON files, {snbt_count} SNBT files, {len(quests)} FTB quests, {len(tables)} reward tables, {total_npc} NPC quests and {nbt_count} structures.')
    return {'json':json_count,'snbt':snbt_count,'quests':len(quests),'reward_tables':len(tables),'npc_quests':total_npc}

if __name__=='__main__':validate()
