"""Build compatibility 1.2.8 offline, preserving the verified original compatibility payload."""
from pathlib import Path
import argparse,hashlib,json,zipfile
from relic_build_env import ROOT,BUILD,INSTALL,INSTANCE,JAVA,ECJ,prepare,compile_java,remap
from build_native_bridge import build

def build_relics(base):
    old=build(INSTANCE,INSTALL,JAVA,ECJ,base)
    dependencies=prepare()
    sources=sorted((ROOT/'compat/relics').rglob('*.java'))
    classes=BUILD/'classes';compile_java(sources,classes,dependencies)
    mapped=BUILD/'relics-srg.jar';remap(classes,mapped)
    output=BUILD/'outlandish-compatibility-fixes-1.2.8.jar'
    resources=ROOT/'compat/relics-resources'
    with zipfile.ZipFile(old) as original,zipfile.ZipFile(mapped) as native,zipfile.ZipFile(output,'w',zipfile.ZIP_DEFLATED) as dst:
        coremods=json.loads(original.read('META-INF/coremods.json'))
        assert 'outlandish_legendary_knife' not in coremods
        coremods['outlandish_legendary_knife']='coremods/legendary_knife.js'
        for info in original.infolist():
            data=original.read(info.filename)
            if info.filename=='META-INF/mods.toml':
                assert b'version="1.2.7"' in data;data=data.replace(b'version="1.2.7"',b'version="1.2.8"',1)
            if info.filename=='META-INF/coremods.json':data=(json.dumps(coremods,indent=2)+'\n').encode()
            dst.writestr(info,data)
        for name in sorted(native.namelist()):dst.writestr(name,native.read(name))
        for path in sorted(resources.rglob('*')):
            if path.is_file():dst.write(path,path.relative_to(resources).as_posix())
    with zipfile.ZipFile(old) as original,zipfile.ZipFile(output) as dst:
        for name in original.namelist():
            if name not in ['META-INF/mods.toml','META-INF/coremods.json']:assert original.read(name)==dst.read(name),name
        before=json.loads(original.read('META-INF/coremods.json'));after=json.loads(dst.read('META-INF/coremods.json'))
        assert all(after[k]==v for k,v in before.items())
        assert dst.testzip() is None
        print('Preserved every existing class/resource and every existing coremod mapping; added native relics and the narrow knife observer.')
    print('Built',output,'SHA256',hashlib.sha256(output.read_bytes()).hexdigest())
    return output

if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--base',type=Path,required=True)
    build_relics(parser.parse_args().base)
