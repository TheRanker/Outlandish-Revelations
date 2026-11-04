package com.theranker.creativeguard.relics;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.nio.charset.StandardCharsets;
import java.nio.file.*;
import java.util.*;

/** Durable, UUID-addressed journal. Corruption fails closed; never silently resets progress. */
public final class RelicStore {
    public static final Gson JSON=new GsonBuilder().setPrettyPrinting().create();
    public static final class Payment {
        public String id,dimension;
        public int x,y,z,stage;
        public boolean personalKnife;
        public String key(){return dimension+":"+x+","+y+","+z;}
    }
    public static final class Progress {
        public int version=1,stages,lpConsumed;
        public String owner,completedAtUtc,awakeningId;
        public Payment pending;
        public String knifeMemorial;
        public boolean finalKnife;
        public List<String> payments=new ArrayList<>();
        public long protectionReadyAt,lastStandReadyAt,echoReadyAt,skyReadyAt;
        public boolean complete(){return completedAtUtc!=null;}
        public void validate(UUID id){
            if(version!=1||!id.toString().equals(owner)||!RelicRules.paid(stages,lpConsumed))throw new IllegalStateException("Invalid relic journal for "+id);
            if(payments==null||payments.size()!=stages||new HashSet<>(payments).size()!=stages)throw new IllegalStateException("Invalid payment history for "+id);
            for(String payment:payments)UUID.fromString(payment);
            if(complete()&&(stages!=3||!finalKnife||awakeningId==null))throw new IllegalStateException("Incomplete joint awakening record for "+id);
            if(complete()){java.time.Instant.parse(completedAtUtc);UUID.fromString(awakeningId);}
            if(protectionReadyAt<0||lastStandReadyAt<0||echoReadyAt<0||skyReadyAt<0)throw new IllegalStateException("Invalid persistent cooldown");
            if(pending!=null&&(pending.id==null||pending.dimension==null||pending.stage!=stages+1||pending.stage>3))throw new IllegalStateException("Invalid pending payment for "+id);
        }
    }
    private final Path directory;
    private final Map<UUID,Progress> loaded=new HashMap<>();
    private final Set<UUID> broken=new HashSet<>();
    public RelicStore(Path world)throws IOException{
        directory=world.resolve("data/outlandish_relics");Files.createDirectories(directory);
        try(var paths=Files.list(directory)){
            for(Path file:paths.filter(p->p.getFileName().toString().endsWith(".json")).toList()){
                String name=file.getFileName().toString();UUID id;
                try{id=UUID.fromString(name.substring(0,name.length()-5));}catch(IllegalArgumentException e){continue;}
                try{Progress p=JSON.fromJson(Files.readString(file),Progress.class);p.validate(id);loaded.put(id,p);}
                catch(Exception e){broken.add(id);System.err.println("[Outlandish relics] Journal unreadable; refusing grants: "+file+" "+e);}
            }
        }
    }
    public Progress get(UUID id){
        if(broken.contains(id))throw new IllegalStateException("Relic journal needs recovery for "+id);
        return loaded.computeIfAbsent(id,k->{Progress p=new Progress();p.owner=k.toString();return p;});
    }
    public Collection<Progress> all(){return List.copyOf(loaded.values());}
    public boolean confirmPayment(Progress p,String durableTransaction)throws IOException{
        if(p.payments.contains(durableTransaction)){if(p.pending!=null)throw new IllegalStateException("Reused payment transaction");return false;}
        Payment tx=p.pending;if(tx==null||!tx.id.equals(durableTransaction)||tx.stage!=p.stages+1||tx.stage>3)throw new IllegalStateException("Unmatched durable debit");
        if(tx.stage==3&&!tx.personalKnife)throw new IllegalStateException("Final personal sacrifice was not verified");
        int oldStages=p.stages,oldLp=p.lpConsumed;boolean oldKnife=p.finalKnife;String witness=p.knifeMemorial;
        p.stages=tx.stage;p.lpConsumed=p.stages*RelicRules.OFFERING;p.finalKnife|=tx.personalKnife;
        p.payments.add(tx.id);p.pending=null;p.knifeMemorial=null;
        try{save(p);}catch(IOException|RuntimeException e){p.stages=oldStages;p.lpConsumed=oldLp;p.finalKnife=oldKnife;p.payments.remove(tx.id);p.pending=tx;p.knifeMemorial=witness;throw e;}
        return true;
    }
    public void save(Progress p)throws IOException{
        UUID id=UUID.fromString(p.owner);p.validate(id);
        Path dest=directory.resolve(id+".json"),temp=directory.resolve(id+".tmp");
        byte[] data=JSON.toJson(p).getBytes(StandardCharsets.UTF_8);
        try(FileChannel out=FileChannel.open(temp,StandardOpenOption.CREATE,StandardOpenOption.TRUNCATE_EXISTING,StandardOpenOption.WRITE)){
            ByteBuffer b=ByteBuffer.wrap(data);while(b.hasRemaining())out.write(b);out.force(true);
        }
        // Never fall back to a non-atomic replacement for a payment journal.
        Files.move(temp,dest,StandardCopyOption.REPLACE_EXISTING,StandardCopyOption.ATOMIC_MOVE);
        try(FileChannel folder=FileChannel.open(directory,StandardOpenOption.READ)){folder.force(true);}catch(IOException|UnsupportedOperationException ignored){/* Directory fsync is unavailable on Windows; file data was forced before atomic replacement. */}
    }
}
