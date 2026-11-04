"""Cross-check authored NPC requests, structures, function hooks and FTB summaries."""
from pathlib import Path
import json,re,zipfile
from snbt import load
from structure_nbt import loads
ROOT=Path(__file__).resolve().parents[1]
def audit():
    index=json.loads((ROOT/'docs/npc-arcs.json').read_text(encoding='utf-8'))['npcs']
    ftb={}
    for file in (ROOT/'config/ftbquests/quests/chapters').glob('*.snbt'):
        chapter,_=load(file)
        for quest in chapter.get('quests',[]):
            for task in quest.get('tasks',[]):
                if task.get('type')=='advancement':ftb.setdefault(task.get('advancement'),[]).append((quest,task))
    words={1:['one','an anvil'],4:['four'],6:['six'],8:['eight'],12:['twelve'],16:['sixteen']}
    results=[];total=0;summary_count=0
    def function_exists(identifier):
        namespace,name=identifier.split(':',1)
        return ROOT/f'kubejs/data/{namespace}/functions/{name}.mcfunction'
    def function_source(identifier):
        file=function_exists(identifier)
        if file.is_file():return file.read_text(encoding='utf-8')
        namespace,name=identifier.split(':',1);entry=f'data/{namespace}/functions/{name}.mcfunction'
        for archive in (ROOT/'config/paxi/datapacks').glob('*.zip'):
            with zipfile.ZipFile(archive) as z:
                if entry in z.namelist():return z.read(entry).decode('utf-8')
        raise AssertionError(f'Missing function {identifier}')
    def check_functions(identifier,seen):
        if identifier in seen:return
        seen.add(identifier);source=function_source(identifier)
        for ref in re.findall(r'\bfunction ([a-z0-9_.-]+:[a-z0-9_/.-]+)',source):check_functions(ref,seen)
    for npc in index:
        folder=ROOT/'kubejs/data/quest_giver/quest_lines'/npc['id']
        root=json.loads((folder/'root.json').read_text(encoding='utf-8'));assert root.get('repeatable',False) is False
        quests=[json.loads(p.read_text(encoding='utf-8')) for p in sorted(folder.glob('quest_*.json'))]
        assert len(ftb[npc['completion_advancement']])==1
        book,task=ftb[npc['completion_advancement']][0];assert task['id']==npc['ftb_task_id']
        summary=[]
        for line in book.get('description',[]):
            match=re.match(r'^(\d+)\. (.*?): (\d+) (.+)\.$',line)
            if match:summary.append((int(match[1]),match[2],int(match[3])))
        if summary:assert len(summary)==len(quests)
        chain=[];seen=set()
        for i,q in enumerate(quests,1):
            assert not q.get('repeatable',False)
            assert q['parent']==('quest_giver:root' if i==1 else f'quest_giver:quest_{i-1:02}')
            assert q['start']['title']['translate'] and q['complete']['description']['translate']
            task=q['tasks'][0];count=task.get('times',task.get('amount'));item=task['item']['item']
            speech=q['start']['description']['translate'].lower()
            assert any(word in speech for word in words[count]),(npc['id'],i,'spoken count mismatch')
            if task['id']=='quest_giver:gift':
                assert task['entity']=='minecraft:villager'
                assert task['name']==('Elyndra' if npc['id']=='elyndra' else npc['name'])
                assert 'one at a time' in speech
            if summary:
                assert summary[i-1]==(i,q['start']['title']['translate'],count),(npc['id'],i,'FTB summary mismatch')
                summary_count+=1
            for reward in q.get('rewards',[]):
                if reward['id']=='quest_giver:command':
                    assert '@a' not in reward['command'] and '@p' not in reward['command']
                    for ref in re.findall(r'function ([a-z0-9_.-]+:[a-z0-9_/.-]+)',reward['command']):check_functions(ref,seen)
            chain.append(f'{count} {item}')
        completion=function_source(npc['completion_function'])
        assert 'advancement grant @s only '+npc['completion_advancement'] in completion
        # Match each generated NPC to the exact name used by the gift handler.
        if npc['id']=='garrick_ashford':
            with zipfile.ZipFile(ROOT/'config/paxi/datapacks/outlandish_garrick_worldgen_v3.zip') as z:_,structure=loads(z.read('data/outlandish/structures/garrick_ruin.nbt'))
        else:_,structure=loads((ROOT/f"kubejs/data/outlandish/structures/{npc['structure'].split(':')[1]}.nbt").read_bytes())
        villagers=[e['nbt'][1] for e in structure['entities'][1][1] if e['nbt'][1]['id'][1]=='minecraft:villager']
        assert len(villagers)==1
        entity_name=json.loads(villagers[0]['CustomName'][1])['text']
        assert entity_name==('Elyndra' if npc['id']=='elyndra' else npc['name'])
        results.append({'npc':npc['name'],'quests':len(quests),'chain':chain,'functions':len(seen),'summary':len(summary)})
        total+=len(quests)
    assert total==81 and len(results)==12 and summary_count==76
    print(f'NPC audit passed: {total} quests, 12 named structure entities, {summary_count} delivery-summary rows and all reachable function references.')
    return results
if __name__=='__main__':audit()
