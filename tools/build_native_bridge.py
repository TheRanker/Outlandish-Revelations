"""Compile an additive Forge 1.20.1 bridge against installed SRG libraries, preserving the base JAR."""
import argparse, hashlib, subprocess, zipfile, os, json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
def build(instance, install, java, compiler, base=None):
    base=base or instance/'mods/outlandish-compatibility-fixes-1.2.6.jar'
    spec=json.loads((ROOT/'compat/native-artifact.json').read_text(encoding='utf-8'))
    assert hashlib.sha256(base.read_bytes()).hexdigest()==spec['baseSha256'],'Unexpected base compatibility JAR'
    libraries=install/'libraries'
    mc=libraries/'net/minecraft/client/1.20.1-20230612.114412/client-1.20.1-20230612.114412-srg.jar'
    forge=libraries/'net/minecraftforge/forge/1.20.1-47.4.28/forge-1.20.1-47.4.28-universal.jar'
    eventbus=libraries/'net/minecraftforge/eventbus/6.2.33/eventbus-6.2.33.jar'
    loader=libraries/'net/minecraftforge/fmlloader/1.20.1-47.4.28/fmlloader-1.20.1-47.4.28.jar'
    required=[base, mc, forge, eventbus, loader, java, compiler]
    assert all(p.is_file() for p in required),required
    classes=ROOT/'build/native-bridge/classes';classes.mkdir(parents=True,exist_ok=True)
    # Put the exact target Minecraft/Forge versions first; no downloads during compilation.
    deps=list(dict.fromkeys(p for p in [mc,forge,eventbus,loader]+list(instance.joinpath('mods').glob('*.jar'))+list(libraries.rglob('*.jar')) if zipfile.is_zipfile(p)))
    args=['-source','17','-target','17','-encoding','UTF-8','-proc:none','-classpath',os.pathsep.join(map(str,deps)), '-d',str(classes)]
    args += [str(p) for p in (ROOT/'compat/src').rglob('*.java')]
    argfile=ROOT/'build/native-bridge/compiler.args'
    argfile.write_text('\n'.join('"'+a.replace('\\','/')+'"' for a in args),encoding='utf-8')
    subprocess.run([str(java),'-jar',str(compiler),'@'+str(argfile)],check=True)
    out=ROOT/'build/native-bridge/outlandish-compatibility-fixes-1.2.7.jar'
    with zipfile.ZipFile(base) as src,zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as dst:
        for info in src.infolist():
            data=src.read(info.filename)
            if info.filename=='META-INF/mods.toml':
                assert b'version="1.2.6"' in data
                data=data.replace(b'version="1.2.6"',b'version="1.2.7"',1)
            dst.writestr(info,data)
        for p in sorted(classes.rglob('*.class')):dst.write(p,p.relative_to(classes).as_posix())
    with zipfile.ZipFile(base) as src,zipfile.ZipFile(out) as dst:
        for n in src.namelist():
            if n!='META-INF/mods.toml':assert src.read(n)==dst.read(n),n
        added=set(dst.namelist())-set(src.namelist())
        assert added=={'com/theranker/creativeguard/WorldRemembersBridge.class','com/theranker/creativeguard/WorldRemembersClientBridge.class'},added
        assert dst.testzip() is None
    print('All existing compatibility classes/coremods/resources preserved byte-for-byte except version metadata.')
    print('Built',out,'SHA256',hashlib.sha256(out.read_bytes()).hexdigest())
    return out
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('--instance',type=Path,required=True);parser.add_argument('--install',type=Path,required=True);parser.add_argument('--java',type=Path,required=True);parser.add_argument('--compiler',type=Path,required=True)
    parser.add_argument('--base',type=Path,help='Original 1.2.6 input JAR, e.g. from deployment backup')
    a=parser.parse_args();build(a.instance,a.install,a.java,a.compiler,a.base)
