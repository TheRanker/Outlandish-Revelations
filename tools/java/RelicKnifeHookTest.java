import java.nio.file.*;
import java.util.*;
import java.util.zip.*;
import javax.script.*;
import org.objectweb.asm.*;
import org.objectweb.asm.tree.*;

/** Run the actual coremod JS against the installed original Blood Magic class. */
public final class RelicKnifeHookTest {
    public static void main(String[] args)throws Exception{
        ClassNode node=new ClassNode();
        try(ZipFile jar=new ZipFile(args[0])){new ClassReader(jar.getInputStream(jar.getEntry("wayoftime/bloodmagic/common/item/ItemSacrificialDagger.class"))).accept(node,0);}
        MethodNode original=node.methods.stream().filter(m->m.name.equals("m_7203_")&&m.desc.startsWith("(Lnet/minecraft/world/level/Level;")).findFirst().orElseThrow();
        List<String> before=signature(original);int count=(int)before.stream().filter(v->v.startsWith("176:")).count();
        boolean selfFlag=false;
        for(AbstractInsnNode n:original.instructions)if(n instanceof MethodInsnNode m&&m.name.equals("findAndFillAltar"))selfFlag=m.getPrevious().getOpcode()==Opcodes.ICONST_0;
        if(!selfFlag)throw new AssertionError("Blood Magic player self-sacrifice flag changed; false is required");
        ScriptEngine engine=new ScriptEngineManager().getEngineByName("nashorn");if(engine==null)throw new IllegalStateException("Installed Nashorn engine unavailable");
        engine.eval(Files.readString(Path.of(args[1])));engine.put("targetNode",node);engine.eval("initializeCoreMod().outlandish_final_knife.transformer(targetNode)");
        int hooks=0;
        for(AbstractInsnNode n:original.instructions.toArray())if(n instanceof MethodInsnNode m&&m.owner.equals("com/theranker/creativeguard/relics/RelicSystem")){
            if(!m.name.equals("knifeFinished")||m.getOpcode()!=Opcodes.INVOKESTATIC||!(m.getPrevious() instanceof VarInsnNode v)||v.var!=2||v.getOpcode()!=Opcodes.ALOAD||m.getNext().getOpcode()!=Opcodes.ARETURN)throw new AssertionError("Unsafe knife hook position");
            original.instructions.remove(m.getPrevious());original.instructions.remove(m);hooks++;
        }
        if(hooks!=count||count<1||!before.equals(signature(original)))throw new AssertionError("Original knife instructions changed");
        System.out.println("Actual Nashorn coremod test passed: "+hooks+" return observers; all original knife instructions preserved.");
        ClassNode altar=new ClassNode();try(ZipFile jar=new ZipFile(args[0])){new ClassReader(jar.getInputStream(jar.getEntry("wayoftime/bloodmagic/common/tile/TileAltar.class"))).accept(altar,0);}
        MethodNode recipient=altar.methods.stream().filter(m->m.name.equals("sacrificialDaggerCall")&&m.desc.equals("(IZ)V")).findFirst().orElseThrow();
        List<String> recipientBefore=signature(recipient);int expected=(int)recipientBefore.stream().filter(v->v.startsWith("177:")).count();
        engine.put("targetNode",altar);engine.eval("initializeCoreMod().outlandish_knife_recipient.transformer(targetNode)");int received=0;
        for(AbstractInsnNode n:recipient.instructions.toArray())if(n instanceof MethodInsnNode m&&m.owner.equals("com/theranker/creativeguard/relics/RelicSystem")){
            if(!m.name.equals("knifeAltarReached")||m.getNext().getOpcode()!=Opcodes.RETURN)throw new AssertionError("Unsafe altar recipient observer");
            for(int i=0;i<3;i++)recipient.instructions.remove(m.getPrevious());recipient.instructions.remove(m);received++;
        }
        if(received!=expected||received<1||!recipientBefore.equals(signature(recipient)))throw new AssertionError("Original altar instructions changed");
        System.out.println("Actual altar-recipient coremod test passed: "+received+" observer; original altar/LP instructions preserved.");
        ClassNode incense=new ClassNode();try(ZipFile jar=new ZipFile(args[0])){new ClassReader(jar.getInputStream(jar.getEntry("wayoftime/bloodmagic/util/helper/PlayerSacrificeHelper.class"))).accept(incense,0);}
        MethodNode sacrifice=incense.methods.stream().filter(m->m.name.equals("sacrificePlayerHealth")).findFirst().orElseThrow();
        List<String> incenseBefore=signature(sacrifice);int expectedIncense=(int)incenseBefore.stream().filter(v->v.startsWith("172:")).count();
        engine.put("targetNode",incense);engine.eval("initializeCoreMod().outlandish_incense_knife.transformer(targetNode)");int incenseHooks=0;
        for(AbstractInsnNode n:sacrifice.instructions.toArray())if(n instanceof MethodInsnNode m&&m.owner.equals("com/theranker/creativeguard/relics/RelicSystem")){
            if(!m.name.equals("knifeFinished")||m.getNext().getOpcode()!=Opcodes.IRETURN||!(m.getPrevious() instanceof VarInsnNode v)||v.var!=0||v.getOpcode()!=Opcodes.ALOAD)throw new AssertionError("Unsafe incense sacrifice observer");
            sacrifice.instructions.remove(m.getPrevious());sacrifice.instructions.remove(m);incenseHooks++;
        }
        if(incenseHooks!=expectedIncense||incenseHooks<1||!incenseBefore.equals(signature(sacrifice)))throw new AssertionError("Original incense sacrifice instructions changed");
        System.out.println("Actual incense sacrifice coremod test passed: "+incenseHooks+" observers; original self-sacrifice instructions preserved.");
    }
    static List<String> signature(MethodNode m){List<String> result=new ArrayList<>();for(AbstractInsnNode n:m.instructions){if(n.getOpcode()<0)continue;String v=n.getOpcode()+":";
        if(n instanceof VarInsnNode x)v+=x.var;if(n instanceof MethodInsnNode x)v+=x.owner+"."+x.name+x.desc;if(n instanceof FieldInsnNode x)v+=x.owner+"."+x.name+x.desc;if(n instanceof LdcInsnNode x)v+=x.cst;
        result.add(v);}return result;}
}
