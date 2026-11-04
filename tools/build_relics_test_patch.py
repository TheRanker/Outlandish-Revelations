"""Build a local, disabled-by-default test patch; never touches an instance or publishes."""
from pathlib import Path
import hashlib
import json
import zipfile
from audit_legendary_relics import audit, ROOT
from audit_relic_preservation import audit as preservation

FILES = [
    'kubejs/outlandish/legendary_relics.json',
    'kubejs/outlandish/world_remembers.json',
    'kubejs/startup_scripts/outlandish_legendary_relics.js',
    'kubejs/startup_scripts/outlandish_world_remembers_core.js',
    'kubejs/startup_scripts/outlandish_world_remembers_events.js',
    'kubejs/server_scripts/outlandish_world_remembers.js',
    'kubejs/client_scripts/outlandish_world_remembers.js',
    'kubejs/data/outlandish/advancements/the_promise_fulfilled.json',
]


def build():
    checked = audit()
    preservation()
    spec = json.loads((ROOT / 'compat/native-artifact.json').read_text(encoding='utf-8'))
    jar = ROOT / spec['path']
    files = {name: ROOT / name for name in FILES}
    files['mods/' + jar.name] = jar
    files['LEGENDARY_RELICS_TESTING.md'] = ROOT / 'docs/LEGENDARY_RELICS_TESTING.md'
    manifest = {
        'type': 'Local test patch for the current development pack; not a release or complete modpack',
        'minecraft': '1.20.1', 'forge': '47.4.28', 'compatibilityVersion': spec['version'],
        'gameplayEnabledByDefault': False,
        'skinIncluded': checked['skin_present'],
        'files': {name: hashlib.sha256(path.read_bytes()).hexdigest() for name, path in files.items()},
    }
    readme = '''Outlandish Revelations — local relic test patch

Use a backed-up COPY of the current development instance, with Minecraft closed.
Replace the old compatibility JAR. Do not leave both old and new versions installed.
Install the matching listed script/config files together. This ZIP does not contain
all mods or NPC data and is not an update for an arbitrary original 5.0 instance.

Native gameplay remains off. In the test copy only, set legendary_relics.json
enabled=true. Leave world_remembers.json ceremonyIntegrationEnabled=false and its
manual memorial list empty. The native structure is registered whenever this JAR
is installed, including while gameplay is disabled. No player/save files are included.

Read LEGENDARY_RELICS_TESTING.md before testing. TEST-PATCH.json records whether
the original skin is included; without it the apparition model is skipped.
No Minecraft, dedicated Forge or multiplayer acceptance is claimed. No live files
were installed by this builder.
'''
    output = ROOT / 'build/outlandish-relics-1.2.8-test-patch.zip'
    output.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(output, 'w', zipfile.ZIP_DEFLATED) as archive:
        for name, path in files.items():
            archive.write(path, name)
        archive.writestr('TEST-PATCH.json', json.dumps(manifest, indent=2) + '\n')
        archive.writestr('README-FIRST.txt', readme)
    with zipfile.ZipFile(output) as archive:
        assert archive.testzip() is None and len(archive.namelist()) == len(set(archive.namelist()))
        assert len([n for n in archive.namelist() if n.startswith('mods/')]) == 1
        for name, sha in manifest['files'].items():
            assert hashlib.sha256(archive.read(name)).hexdigest() == sha
    print(f'Built {output.name}: {len(FILES)} matching overrides, one custom JAR, test guide and hash manifest. Nothing installed.')
    return output


if __name__ == '__main__':
    build()
