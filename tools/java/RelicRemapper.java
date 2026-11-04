import java.nio.file.*;
import java.util.*;
import java.util.zip.*;
import java.io.*;
import org.objectweb.asm.*;
import org.objectweb.asm.commons.*;

/** Offline build utility. Minecraft mappings/jars remain in ignored build output. */
public final class RelicRemapper {
  public static void main(String[] args) throws Exception {
    if(args[0].equals("jdk")) {
      for(int i=2;i<args.length;i++){Path file=Path.of(args[1]).resolve(args[i]+".class");Files.createDirectories(file.getParent());try(InputStream data=ClassLoader.getSystemResourceAsStream(args[i]+".class")){if(data==null)throw new IOException("Missing JDK class "+args[i]);Files.write(file,data.readAllBytes());}}return;
    }
    boolean toNamed=args[0].equals("named");
    Map<String,String> methods=new HashMap<>(),fields=new HashMap<>(),simple=new HashMap<>();
    for(String line:Files.readAllLines(Path.of(args[1]))) {
      String[] v=line.split("\t");
      if(v[0].equals("M")){methods.put(v[1]+"#"+v[2]+v[3],v[4]);simple.put(v[4],v[2]);}
      else {fields.put(v[1]+"#"+v[2],v[3]);simple.put(v[3],v[2]);}
    }
    List<ZipFile> libraries=new ArrayList<>();
    for(int i=4;i<args.length;i++)libraries.add(new ZipFile(args[i]));
    Map<String,List<String>> parents=new HashMap<>();
    class Mapper extends Remapper {
      String resolve(String owner,String key,Map<String,String> map,Set<String> visited) {
        if(owner==null||!visited.add(owner))return null;
        String found=map.get(owner+"#"+key);if(found!=null)return found;
        if(!parents.containsKey(owner)) {
          List<String> p=new ArrayList<>();
          for(ZipFile z:libraries){ZipEntry e=z.getEntry(owner+".class");if(e==null)continue;
            try{ClassReader r=new ClassReader(z.getInputStream(e));if(r.getSuperName()!=null)p.add(r.getSuperName());p.addAll(Arrays.asList(r.getInterfaces()));}catch(IOException x){throw new UncheckedIOException(x);}break;}
          parents.put(owner,p);
        }
        for(String parent:parents.get(owner)){found=resolve(parent,key,map,visited);if(found!=null)return found;}return null;
      }
      public String mapMethodName(String owner,String name,String desc){if(toNamed)return simple.getOrDefault(name,name);String v=resolve(owner,name+desc,methods,new HashSet<>());return v==null?name:v;}
      public String mapFieldName(String owner,String name,String desc){if(toNamed)return simple.getOrDefault(name,name);String v=resolve(owner,name,fields,new HashSet<>());return v==null?name:v;}
    }
    Mapper mapper=new Mapper();
    Path input=Path.of(args[2]),output=Path.of(args[3]);Files.createDirectories(output.getParent());
    try(ZipOutputStream out=new ZipOutputStream(Files.newOutputStream(output))) {
      if(Files.isDirectory(input)) {
        try(var paths=Files.walk(input)){for(Path p:paths.filter(Files::isRegularFile).sorted().toList())write(out,input.relativize(p).toString().replace('\\','/'),Files.readAllBytes(p),mapper);}
      } else try(ZipFile z=new ZipFile(input.toFile())) {for(ZipEntry e:Collections.list(z.entries()))if(!e.isDirectory())write(out,e.getName(),z.getInputStream(e).readAllBytes(),mapper);}
    } finally {for(ZipFile z:libraries)z.close();}
  }
  static void write(ZipOutputStream out,String name,byte[] data,Remapper mapper)throws Exception{
    if(name.endsWith(".class")){ClassReader r=new ClassReader(data);ClassWriter w=new ClassWriter(0);r.accept(new ClassRemapper(w,mapper),0);data=w.toByteArray();}
    else if(name.startsWith("META-INF/")&&(name.endsWith(".SF")||name.endsWith(".RSA")))return;
    ZipEntry entry=new ZipEntry(name);entry.setTime(0);out.putNextEntry(entry);out.write(data);out.closeEntry();
  }
}
