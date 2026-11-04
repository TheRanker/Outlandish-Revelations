"""Audit authored late progression, quest links and reward paths without Minecraft."""
from collections import Counter
from pathlib import Path
import json
import re
from snbt import load

ROOT = Path(__file__).resolve().parents[1]
CHAPTERS = {'extreme_voltage', 'insane_voltage', 'ev_chemistry', 'iv_chemistry',
            'draconic_industry', 'draconic_evolution', 'end_game_armor',
            'end_game_boss', 'journeys_end'}
TIERS = {'hv': 256, 'ev': 1024, 'iv': 4096, 'luv': 16384, 'zpm': 65536, 'uv': 262144}
INJECTORS = {'DRACONIUM': 0, 'WYVERN': 1, 'DRACONIC': 2, 'CHAOTIC': 3}


def read(name):
    return json.loads((ROOT / 'kubejs/outlandish' / (name + '.json')).read_text(encoding='utf-8-sig'))


def strip_count(value):
    return re.sub(r'^\d+x\s+', '', value)


def values(value):
    yield value
    if isinstance(value, dict):
        for child in value.values():
            yield from values(child)
    elif isinstance(value, list):
        for child in value:
            yield from values(child)


def custom_inputs(value):
    # Tags and native inputs are external supplies in this limited producer check.
    return {strip_count(v) for v in values(value)
            if isinstance(v, str) and strip_count(v).startswith('kubejs:')}


def audit():
    chapters = {}
    quests = {}
    owners = {}
    for path in (ROOT / 'config/ftbquests/quests/chapters').glob('*.snbt'):
        chapter, _ = load(path)
        chapters[path.stem] = chapter
        for quest in chapter['quests']:
            quests[quest['id']] = quest
            owners[quest['id']] = quest['id']
            for task in quest.get('tasks', []):
                owners[task['id']] = quest['id']
    chosen = [(stem, q) for stem in sorted(CHAPTERS) for q in chapters[stem]['quests']]
    # Cross-chapter cycles can block a later task even if all its IDs exist.
    graph = {}
    for key, quest in quests.items():
        deps = quest.get('dependencies', [])
        assert all(dep in owners for dep in deps), ('Unresolved dependency', key, deps)
        graph[key] = {owners[dep] for dep in deps if owners[dep] != key}
    active = []
    complete = set()

    def visit(key):
        assert key not in active, ('Quest dependency cycle', active + [key])
        if key in complete:
            return
        active.append(key)
        for dep in graph[key]:
            visit(dep)
        active.pop()
        complete.add(key)

    for key in graph:
        visit(key)
    observation = {row['task']: row for row in read('quest_observation_rules')['observeRules']}
    observed = 0
    fluid_samples = 0
    for stem, quest in chosen:
        for task in quest.get('tasks', []):
            if task['type'] == 'custom':
                assert task['id'] in observation, ('Missing formed-machine observation', quest['id'])
                assert observation[task['id']]['quest'] == quest['id']
                observed += 1
            if stem in {'ev_chemistry', 'iv_chemistry'} and task['type'] == 'fluid':
                assert task['amount'] == 1000 and task['fluid'].startswith('gtceu:')
                fluid_samples += 1

    tables = {}
    for path in (ROOT / 'config/ftbquests/quests/reward_tables').glob('*.snbt'):
        table, _ = load(path)
        if 'loot_crate' in table:
            tables[table['loot_crate']['string_id']] = table
    basic = {'minecraft:iron_ingot', 'minecraft:iron_block', 'minecraft:redstone',
             'minecraft:redstone_block', 'minecraft:gold_ingot', 'minecraft:gold_block',
             'minecraft:lapis_lazuli', 'minecraft:lapis_block', 'minecraft:glass',
             'minecraft:cooked_beef'}
    crates = set()
    rewards = 0
    for stem, quest in chosen:
        for reward in quest.get('rewards', []):
            rewards += 1
            if stem == 'end_game_boss':
                continue  # The intended victory rewards are checked separately.
            if reward['type'] == 'xp':
                continue
            assert reward['type'] == 'item', ('Review late special reward', stem, quest['id'])
            stack = reward['item']
            assert isinstance(stack, dict) and stack['id'] == 'ftbquests:lootcrate', (stem, quest['id'])
            crate = stack['tag']['type']
            crates.add(crate)
            assert all(row['item'] in basic for row in tables[crate]['rewards']), ('Progression reward', crate)

    data = read('draconic_progression')
    rows = data['gt'] + data['overrides']
    assert len({row['id'] for row in rows}) == len(rows), 'Duplicate authored Draconic recipe ID'
    custom = {row['id'] for row in data['items']}
    produced = {strip_count(s) for row in data['gt'] for s in row['outputs']}
    assert custom <= produced, 'Draconic custom item without a producer'
    for tier, voltage in TIERS.items():
        matrix = next(row for row in data['gt'] if row['id'] == f'otg:draconic/{tier}_matrix')
        assert matrix['EUt'] == voltage and f'#gtceu:circuits/{tier}' in matrix['inputs']
    for row in data['gt']:
        assert not row.get('catalysts') and not row.get('fluidInputs'), 'Draconic builder does not apply these fields'
    fusion = {}
    for row in data['overrides']:
        output = row['recipe']['result']['item']
        if output in fusion:
            previous = fusion[output]
            assert (row['tier'], row['recipe']['tier'], row['recipe']['total_energy']) == (
                previous['tier'], previous['recipe']['tier'], previous['recipe']['total_energy']), ('Alternative recipe needs separate guidance', output)
        fusion[output] = row
    for row in data['overrides']:
        recipe = row['recipe']
        assert recipe['type'] == 'draconicevolution:fusion_crafting'
        assert recipe['tier'] in INJECTORS and recipe['total_energy'] > 0
        inputs = custom_inputs([recipe['catalyst'], recipe['ingredients']])
        assert f'kubejs:{row["tier"]}_draconic_matrix' in inputs, ('Missing industrial matrix gate', row['id'])
    assert set(data['gatedOutputs']) - (set(fusion) | produced) == {'draconicevolution:generator'}, 'Unreplaced Draconic gate'
    # Each injector upgrade must be craftable with the preceding injector tier.
    for output, maximum in [('wyvern_crafting_injector', 0), ('awakened_crafting_injector', 1), ('chaotic_crafting_injector', 2)]:
        row = fusion['draconicevolution:' + output]
        assert INJECTORS[row['recipe']['tier']] <= maximum, ('Injector bootstrap loop', output)
    descriptions = 0
    for quest in chapters['draconic_evolution']['quests']:
        text = ' '.join(quest.get('description', []))
        for task in quest.get('tasks', []):
            stack = task.get('item')
            item = stack.get('id') if isinstance(stack, dict) else stack
            if item not in fusion:
                continue
            row = fusion[item]
            match = re.search(r'recipe requires ([\d,]+) FE', text)
            if match:
                assert int(match[1].replace(',', '')) == row['recipe']['total_energy'], ('Stale fusion energy', quest['id'])
                descriptions += 1
            match = re.search(r'Use (\w+)-tier injectors', text)
            if match:
                assert match[1].upper() == row['recipe']['tier'], ('Stale injector guidance', quest['id'])

    # Follow only custom-item ancestry; native items, tags, machines and fluids
    # are assumed supplied. This is not a full native-mod reachability proof.
    producers = []
    for name in ['tinkers_progression', 'blood_progression', 'systems_progression', 'draconic_progression']:
        source = read(name)
        for row in source.get('gt', []):
            producers.append((custom_inputs(row['inputs'] + row.get('catalysts', [])), custom_inputs(row['outputs'])))
        for row in source.get('altar', []):
            producers.append((custom_inputs(row['input']), custom_inputs(row['output'])))
        for row in source.get('crafting', []) + source.get('overrides', []):
            recipe = row.get('recipe', {})
            result = recipe.get('result', recipe.get('output', {}))
            producers.append((custom_inputs([v for k, v in recipe.items() if k not in ('result', 'output', 'results')]), custom_inputs(result)))
    available = set()
    while True:
        discovered = set().union(*(output for inputs, output in producers if inputs <= available))
        if discovered <= available:
            break
        available.update(discovered)
    assert custom <= available, ('Unreachable authored custom producer path', custom - available)

    boss = quests['06DABBCE6668C79A']
    assert boss.get('can_repeat', 0) == 0 and not boss.get('dependencies')
    assert [t.get('advancement') for t in boss['tasks']] == ['incendium:infernal_dunes/inferno/kill']
    victory = {r['item']['id']: r for r in boss['rewards'] if r['type'] == 'item'}
    assert set(victory) == {'kubejs:rankers_sword', 'minecraft:potion'}
    assert victory['kubejs:rankers_sword'].get('count', 1) == 1
    assert victory['minecraft:potion']['count'] == 4
    assert victory['minecraft:potion']['item']['tag']['Potion'] == 'kubejs:radiation'
    assert all(r.get('team_reward') is False for r in boss['rewards'])
    assert all(r['command'].startswith('/tellraw ') for r in boss['rewards'] if r['type'] == 'command')
    finale = quests['6D3EFEAA5280A59C']
    assert finale['dependencies'] == [boss['id']]
    assert finale['tasks'][0]['item']['id'] == 'kubejs:rankers_sword'
    assert finale['tasks'][0]['consume_items'] is False
    config = read('world_remembers')
    assert config['ceremonyIntegrationEnabled'] is False and not config['memorials']
    counts = Counter(stem for stem, q in chosen)
    result = dict(quests=len(chosen), rewards=rewards, chapter_counts=dict(counts),
                  reward_pools=sorted(crates), authored_draconic_recipes=len(rows),
                  fusion_descriptions_with_energy=descriptions, custom_draconic_items=len(custom),
                  formed_machine_tasks=observed, chemistry_fluid_samples=fluid_samples)
    print('Late progression audit passed: ' + json.dumps(result, sort_keys=True))
    return result


if __name__ == '__main__':
    audit()
