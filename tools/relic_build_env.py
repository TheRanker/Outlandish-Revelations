"""Prepare a named compile classpath and remap new native classes back to SRG offline."""
from pathlib import Path
import re,os,subprocess,zipfile,json
ROOT=Path(__file__).resolve().parents[1]
INSTALL=Path(os.environ.get('OR_MC_INSTALL',r'D:\Minecraft Modpacks\Install'))
INSTANCE=Path(os.environ.get('OR_MC_INSTANCE',r'D:\Minecraft Modpacks\Instances\Outlandish Revelations (1)'))
JAVA=Path(os.environ.get('OR_JAVA',str(INSTALL/'java/Jre_21/bin/java.exe')))
ECJ=Path(os.environ.get('OR_ECJ',str(ROOT/'build/native-tools/ecj-3.38.0.jar')))
BUILD=ROOT/'build/relics'
MC=INSTALL/'libraries/net/minecraft/client/1.20.1-20230612.114412/client-1.20.1-20230612.114412-srg.jar'
FORGE=INSTALL/'libraries/net/minecraftforge/forge/1.20.1-47.4.28/forge-1.20.1-47.4.28-universal.jar'
ASM=[INSTALL/f'libraries/org/ow2/asm/{n}/9.7.1/{n}-9.7.1.jar' for n in ['asm','asm-commons']]

def compile_java(sources,output,classpath):
    output.mkdir(parents=True,exist_ok=True)
    args=['-source','17','-target','17','-encoding','UTF-8','-proc:none','-classpath',os.pathsep.join(map(str,classpath)),'-d',str(output)]+list(map(str,sources))
    f=BUILD/(output.name+'.args');f.write_text('\n'.join('"'+a.replace('\\','/')+'"' for a in args),encoding='utf-8')
    subprocess.run([str(JAVA),'-jar',str(ECJ),'@'+str(f)],check=True)

def mappings():
    dest=BUILD/'members.tsv'
    if dest.exists():return dest
    official=INSTALL/'libraries/net/minecraft/client/1.20.1-20230612.114412/client-1.20.1-20230612.114412-mappings.txt'
    merged=INSTALL/'libraries/de/oceanlabs/mcp/mcp_config/1.20.1-20230612.114412/mcp_config-1.20.1-20230612.114412-mappings-merged.txt'
    classes={};srg={};fields={};current=None
    lines=official.read_text(encoding='utf-8').splitlines()
    for line in lines:
        if line and not line.startswith((' ','#')):
            named,obf=line[:-1].split(' -> ');classes[named]=obf
    for line in merged.read_text(encoding='utf-8').splitlines()[1:]:
        if not line.startswith('\t'):current=line.split()[0]
        elif not line.startswith('\t\t'):
            parts=line.split()
            if len(parts)==3:srg[current,parts[0],parts[1]]=parts[2]
            elif len(parts)==2:fields[current,parts[0]]=parts[1]
    def desc(typ,obfuscate):
        dims=0
        while typ.endswith('[]'):dims+=1;typ=typ[:-2]
        primitives={'void':'V','boolean':'Z','byte':'B','short':'S','int':'I','long':'J','float':'F','double':'D','char':'C'}
        return '['*dims+(primitives[typ] if typ in primitives else 'L'+(classes.get(typ,typ) if obfuscate else typ).replace('.','/')+';')
    result=[];current=None
    for line in lines:
        if not line or line.startswith('#'):continue
        if not line.startswith(' '):current=line[:-1].split(' -> ')[0];continue
        value,obf=line.strip().split(' -> ');value=re.sub(r'^\d+:\d+:','',value)
        if '(' in value:
            m=re.match(r'([^ ]+) ([^(]+)\(([^)]*)\)',value)
            if not m:continue
            ret,name,args=m.groups();args=args.split(',') if args else []
            od='('+''.join(desc(t,True) for t in args)+')'+desc(ret,True)
            nd='('+''.join(desc(t,False) for t in args)+')'+desc(ret,False)
            key=(classes[current].replace('.','/'),obf,od)
            if key in srg and not name.startswith('<'):result.append('\t'.join(['M',current.replace('.','/'),name,nd,srg[key]]))
        else:
            typ,name=value.split(' ',1);key=(classes[current].replace('.','/'),obf)
            if key in fields:result.append('\t'.join(['F',current.replace('.','/'),name,fields[key]]))
    dest.write_text('\n'.join(result)+'\n',encoding='utf-8');return dest

def prepare():
    BUILD.mkdir(parents=True,exist_ok=True);mapping=mappings()
    tool=BUILD/'remapper';compile_java([ROOT/'tools/java/RelicRemapper.java'],tool,ASM)
    named=BUILD/'minecraft-named.jar'
    if not named.exists():subprocess.run([str(JAVA),'-cp',os.pathsep.join(map(str,[tool]+ASM)),'RelicRemapper','named',str(mapping),str(MC),str(named),str(MC)],check=True)
    gson=INSTALL/'libraries/com/google/code/gson/gson/2.10/gson-2.10.jar'
    deps=[named,FORGE,gson]+list(INSTALL.joinpath('libraries').rglob('*.jar'))+list(INSTANCE.joinpath('mods').glob('*.jar'))
    # Prefer exact 1.20.1 libraries; do not let later Minecraft/Forge JARs shadow the target.
    deps=[p for p in dict.fromkeys(deps) if zipfile.is_zipfile(p)]
    return deps

def remap(classes,output):
    libs=[BUILD/'minecraft-named.jar',FORGE]+[INSTANCE/'mods'/n for n in ['BloodMagic-1.18-1.20.1-3.3.8-50.jar','curios-forge-5.14.1+1.20.1.jar','caelus-forge-3.2.0+1.20.1.jar']]
    subprocess.run([str(JAVA),'-cp',os.pathsep.join(map(str,[BUILD/'remapper']+ASM)),'RelicRemapper','srg',str(mappings()),str(classes),str(output)]+list(map(str,libs)),check=True)

if __name__=='__main__':
    print('Prepared',len(prepare()),'local compile dependencies; no downloads.')
