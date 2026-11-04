"""Audit authored Blood Magic recipes and early industrial quest links without running Minecraft."""
from pathlib import Path
from collections import Counter
import json,re
from snbt import load
ROOT=Path(__file__).resolve().parents[1]
def item(spec):return re.sub(r'^\d+x\s+','',spec)
def audit():
    data=json.loads((ROOT/'kubejs/outlandish/blood_progression.json').read_text(encoding='utf-8'))
    custom={'kubejs:'+row['id'] for row in data['items']};assert len(custom)==24
    recipes=[]
    for row in data['gt']:recipes.append((row['id'],set(map(item,row['inputs'])),set(map(item,row['outputs']))))
    for row in data['altar']:recipes.append((row['id'],{item(row['input'])},{item(row['output'])}))
    for row in data['crafting']:
        inputs={spec.get('item','#'+spec['tag'] if 'tag' in spec else 'bloodmagic:bloodorb') for spec in row['recipe']['key'].values()}
        recipes.append((row['id'],inputs,{row['recipe']['result']['item']}))
    assert len(recipes)==39 and len({r[0] for r in recipes})==39
    outputs=set().union(*(r[2] for r in recipes));assert custom<=outputs
    assert set(data['removeOutputs'])<=outputs,'Removed native output without replacement'
    # With native/external inputs supplied, custom recipes should not require an impossible closed loop.
    available=set().union(*(r[1] for r in recipes))-outputs;pending=recipes[:]
    while pending:
        ready=[r for r in pending if r[1]<=available]
        assert ready,('Closed dependency cycle in authored Blood recipes',[r[0] for r in pending])
        for r in ready:available.update(r[2]);pending.remove(r)
    for tier,voltage,level in [('lv',16,0),('mv',64,1),('hv',256,2),('ev',1024,3)]:
        assert all(row['EUt']==voltage for row in data['gt'] if row['id'].startswith('otg:blood/'+tier+'/'))
        infusion=next(r for r in data['altar'] if r['id']==f'otg:blood/{tier}/infuse_substrate');assert infusion['upgradeLevel']==level
        for ending in ['slate','orb']:assert next(r for r in data['altar'] if r['id']==f'otg:blood/{tier}/{ending}')['upgradeLevel']==level+1
    selected={'create','steam_power','low_voltage','medium_voltage','high_voltage','blood_magic'}
    definitions={};quests={};counts=Counter();chosen=[];tables={};crate_types={}
    for f in (ROOT/'config/ftbquests/quests/chapters').glob('*.snbt'):
        chapter,_=load(f)
        for q in chapter['quests']:
            quests[q['id']]=q;definitions[q['id']]=q['id']
            for task in q.get('tasks',[]):definitions[task['id']]=q['id']
            if f.stem in selected:chosen.append((f.stem,q));counts[f.stem]+=1
    for f in (ROOT/'config/ftbquests/quests/reward_tables').glob('*.snbt'):
        table,_=load(f);tables[table['id']]=table
        if 'loot_crate' in table:crate_types[table['loot_crate']['string_id']]=table
    rewards=0
    for chapter,q in chosen:
        for dependency in q.get('dependencies',[]):assert dependency in definitions,(chapter,q['id'],dependency)
        for reward in q.get('rewards',[]):
            rewards+=1
            assert reward['type'] in ['xp','item','loot'],('Special reward needs review',chapter,q['id'])
            if reward['type']=='loot':assert reward['table_id'] in tables
            if reward['type']=='item':
                stack=reward['item'];assert isinstance(stack,dict) and stack['id']=='ftbquests:lootcrate'
                pool=crate_types[stack['tag']['type']]
                assert all(not str(r.get('item','')).startswith(('bloodmagic:','kubejs:')) for r in pool['rewards']),('Blood progression reward bypass',q['id'])
    config=json.loads((ROOT/'kubejs/outlandish/world_remembers.json').read_text(encoding='utf-8'))
    assert config['ceremonyIntegrationEnabled'] is False and config['memorials']==[]
    assert sum(counts.values())==265 and counts['blood_magic']==50
    print(f'Blood audit passed: 24 custom items, 39 recipes, 11 replaced outputs; {len(chosen)} quests/{rewards} reward entries across six chapters. Ceremony disabled.')
    return dict(counts)
if __name__=='__main__':audit()
