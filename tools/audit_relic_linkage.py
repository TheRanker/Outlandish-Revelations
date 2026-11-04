"""Check remapped native member references against the actual installed SRG/API JARs."""
from pathlib import Path
import zipfile,json,subprocess,os
from classfile import ClassFile
from relic_build_env import ROOT,BUILD,MC,FORGE,INSTALL,INSTANCE,JAVA,ASM

def audit(jar=None):
    jar=jar or BUILD/'outlandish-compatibility-fixes-1.2.8.jar'
    jars=[MC,FORGE,INSTALL/'libraries/net/minecraftforge/eventbus/6.2.33/eventbus-6.2.33.jar']
    jars += [INSTANCE/'mods'/n for n in ['BloodMagic-1.18-1.20.1-3.3.8-50.jar','curios-forge-5.14.1+1.20.1.jar','caelus-forge-3.2.0+1.20.1.jar']]
    jars += [INSTALL/'libraries/net/minecraftforge/fmlloader/1.20.1-47.4.28/fmlloader-1.20.1-47.4.28.jar']
    jars += [p for p in INSTALL.joinpath('libraries').rglob('*.jar') if any(s in p.as_posix() for s in ['/mergetool/','/forgespi/'])]
    opened=[zipfile.ZipFile(p) for p in jars]
    cache={};failures=[];checked=0;classes=0
    def get(name):
        if name not in cache:
            cache[name]=None
            if name.startswith(('java/','javax/')):
                file=BUILD/'jdk'/f'{name}.class'
                if not file.exists():subprocess.run([str(JAVA),'-cp',os.pathsep.join(map(str,[BUILD/'remapper']+ASM)),'RelicRemapper','jdk',str(BUILD/'jdk'),name],check=True)
                cache[name]=ClassFile(file.read_bytes());return cache[name]
            for z in opened:
                try:cache[name]=ClassFile(z.read(name+'.class'));break
                except KeyError:continue
        return cache[name]
    def resolve(owner,name,desc,field,visited=None):
        visited=set() if visited is None else visited
        if owner in visited:return False
        visited.add(owner);value=get(owner)
        if value is None:return False
        if (name,desc) in (value.fields if field else value.methods):return True
        if name=='<init>':return False
        return any(resolve(parent,name,desc,field,visited) for parent in value.parents)
    try:
        with zipfile.ZipFile(jar) as z:
            for name in z.namelist():
                if not name.startswith('com/theranker/creativeguard/relics/') or not name.endswith('.class'):continue
                cls=ClassFile(z.read(name));classes+=1
                if not name.split('/')[-1].startswith('RelicClient'):
                    assert not any(isinstance(v,str) and ('net/minecraft/client/' in v or 'net/minecraftforge/client/' in v) for v in cls.cp),('Client type leaked into common native code',name)
                for kind,owner,member,desc in cls.references():
                    if not owner.startswith(('net/minecraft/','net/minecraftforge/','wayoftime/bloodmagic/','top/theillusivec4/')):continue
                    if resolve(owner,member,desc,kind==9):checked+=1
                    else:failures.append((name,owner,member,desc))
        assert not failures,'Native linkage failures: '+json.dumps(failures,indent=2)
    finally:
        for z in opened:z.close()
    print(f'Native linkage audit passed: {classes} new classes, {checked} installed SRG/API member references; common classes contain no client API types. Not a Forge launch.')
    return {'classes':classes,'member_references':checked}
if __name__=='__main__':audit()
