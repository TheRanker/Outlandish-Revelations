"""Portable standard-library validation of the checked-in pack overrides."""
from collections import defaultdict
from pathlib import Path
import json
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
    for folder in ('kubejs/data','kubejs/outlandish'):
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
    manifest=json.loads((ROOT/'manifest.json').read_text())
    assert manifest['minecraft']['version']=='1.20.1' and manifest['overrides']=='overrides'
    assert len({(entry['projectID'],entry['fileID']) for entry in manifest['files']})==len(manifest['files'])
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
