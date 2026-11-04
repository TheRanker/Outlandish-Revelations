"""Build a local development CurseForge ZIP from tracked override sources. No upload."""
from pathlib import Path
import json
import hashlib
import subprocess
import zipfile
from validate_pack import validate,ROOT

if __name__=='__main__':
    validate()
    manifest=json.loads((ROOT/'manifest.json').read_text())
    native=json.loads((ROOT/'compat/native-artifact.json').read_text())
    native_jar=ROOT/native['path']
    assert hashlib.sha256(native_jar.read_bytes()).hexdigest()==native['sha256'],'Native artifact hash mismatch'
    manifest['files']=[entry for entry in manifest['files'] if entry['projectID']!=native['replacesProjectID']]
    tracked=subprocess.check_output(['git','ls-files','--cached','--others','--exclude-standard','-z'],cwd=ROOT).decode().split('\0')
    files=[name for name in tracked if name.startswith(('config/','defaultconfigs/','kubejs/','patchouli_books/','resources/')) and not name.startswith(('kubejs/probe/','kubejs/.probe/'))]
    assert any(name.startswith('config/ftbquests/') for name in files),'Stage the source files before building'
    assert any(name.startswith('config/paxi/') for name in files),'Stage the worldgen files before building'
    output=ROOT/'build'/('Outlandish-Revelations-'+manifest['version']+'.zip')
    output.parent.mkdir(exist_ok=True)
    with zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as archive:
        archive.writestr('manifest.json',json.dumps(manifest,indent=2)+'\n')
        archive.write(native_jar,'overrides/mods/'+native_jar.name)
        for name in files:archive.write(ROOT/name,'overrides/'+name)
    with zipfile.ZipFile(output) as archive:assert archive.testzip() is None
    print(f'Built {output.name} with {len(files)} overrides. Local development artifact only; nothing published.')
