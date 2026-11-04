import com.theranker.creativeguard.relics.*;
import java.nio.file.*;
import java.util.*;

/** Exercises the production game-independent classes, not a Minecraft simulation. */
public final class RelicRulesTest {
    static int checks;
    static void check(boolean ok,String name){checks++;if(!ok)throw new AssertionError(name);}
    static void equal(double actual,double expected,String name){check(Math.abs(actual-expected)<.0001,name);}
    interface Action {void run()throws Exception;}
    static void rejects(Action test,String name)throws Exception{try{test.run();}catch(Exception e){checks++;return;}throw new AssertionError(name);}
    static RelicStore.Payment pending(RelicStore.Progress p,int stage,boolean knife){var tx=new RelicStore.Payment();tx.id=UUID.randomUUID().toString();tx.dimension="minecraft:overworld";tx.x=15;tx.y=84;tx.z=20;tx.stage=stage;tx.personalKnife=knife;p.pending=tx;return tx;}
    public static void main(String[] args)throws Exception{
        equal(RelicRules.fracture(20),7,"Fracture 35 percent");equal(RelicRules.fracture(100),12,"Fracture boss cap");
        equal(RelicRules.echo(20),8,"Echo 40 percent");equal(RelicRules.echo(1000),14,"Echo boss cap");
        for(double invalid:new double[]{0,-1,Double.NaN,Double.POSITIVE_INFINITY,Double.NEGATIVE_INFINITY}){equal(RelicRules.echo(invalid),0,"Invalid echo input");equal(RelicRules.fracture(invalid),0,"Invalid fracture input");check(!RelicRules.dangerous(invalid,20),"Invalid dangerous hit");}
        check(!RelicRules.dangerous(5.999,20),"Danger threshold below boundary");check(RelicRules.dangerous(6,20),"Danger threshold exact boundary");
        check(RelicRules.dangerous(30,100),"Danger threshold scales with max health");equal(RelicRules.protectedDamage(8),6,"Danger hit reduced by 25 percent");
        equal(RelicRules.restoredHealth(20),4,"Ordinary Last Stand restoration");equal(RelicRules.restoredHealth(1000),10,"Last Stand capped at five hearts");equal(RelicRules.restoredHealth(4),.8,"Small maximum health scales correctly");
        check(RelicRules.resonance(99,8)==100,"Resonance upper bound");check(RelicRules.resonance(2,-75)==0,"Resonance lower bound");
        check(!RelicRules.paid(3,10000),"One basin cannot count as three offerings");check(RelicRules.paid(3,30000),"Total LP is exactly three basins");check(!RelicRules.paid(4,40000),"Fourth offering invalid");
        Path world=Path.of(args[0]);Files.createDirectories(world);UUID alice=UUID.randomUUID(),bob=UUID.randomUUID();
        RelicStore store=new RelicStore(world);var a=store.get(alice);store.get(bob);
        var first=pending(a,1,false);store.save(a);
        RelicStore restart=new RelicStore(world);var recovered=restart.get(alice);
        check(recovered.pending.id.equals(first.id)&&recovered.stages==0,"Prepared payment survives a process-style reload without false credit");
        rejects(()->restart.confirmPayment(recovered,UUID.randomUUID().toString()),"Foreign transaction rejected");
        check(restart.confirmPayment(recovered,first.id),"Matching persisted debit commits first offering");check(recovered.stages==1&&recovered.lpConsumed==10000,"First offering totals");
        check(!restart.confirmPayment(recovered,first.id),"Committed debit replay is idempotent");check(restart.get(bob).stages==0,"Other UUID receives no progress");
        var second=pending(recovered,2,false);restart.save(recovered);check(restart.confirmPayment(recovered,second.id),"Second distinct debit commits");
        var third=pending(recovered,3,false);restart.save(recovered);rejects(()->restart.confirmPayment(recovered,third.id),"Final stage rejects absent knife proof");
        check(recovered.stages==2&&recovered.lpConsumed==20000,"Rejected final action preserves earlier offerings");third.personalKnife=true;restart.save(recovered);
        Path blocked=world.resolve("data/outlandish_relics/"+alice+".tmp");Files.createDirectory(blocked);
        rejects(()->restart.confirmPayment(recovered,third.id),"A failed disk write cannot commit the final stage");
        check(recovered.stages==2&&recovered.lpConsumed==20000&&recovered.pending==third&&!recovered.finalKnife&&recovered.payments.size()==2,"Failed save restores the prepared payment and prior in-memory state");
        check(new RelicStore(world).get(alice).pending.id.equals(third.id),"Failed save leaves the durable prepared journal recoverable");Files.delete(blocked);
        check(restart.confirmPayment(recovered,third.id),"Verified final debit commits");check(recovered.stages==3&&recovered.lpConsumed==30000&&recovered.finalKnife,"Three offerings and personal sacrifice retained");
        recovered.awakeningId=UUID.randomUUID().toString();recovered.completedAtUtc="2026-11-04T12:34:56Z";restart.save(recovered);
        RelicStore loaded=new RelicStore(world);var restored=loaded.get(alice);check(restored.complete()&&restored.completedAtUtc.equals(recovered.completedAtUtc),"Completed personal record/date survives restart");check(restored.payments.size()==3,"All three separate debit IDs persist");
        restored.protectionReadyAt=1800;restored.lastStandReadyAt=12000;restored.echoReadyAt=240;restored.skyReadyAt=400;loaded.save(restored);
        var cooldowns=new RelicStore(world).get(alice);check(cooldowns.protectionReadyAt==1800&&cooldowns.lastStandReadyAt==12000&&cooldowns.echoReadyAt==240&&cooldowns.skyReadyAt==400,"All cooldown deadlines survive restart");
        rejects(()->restored.validate(bob),"UUID mismatch rejected");
        restored.lpConsumed=10000;rejects(()->restored.validate(alice),"Paid total tampering rejected");restored.lpConsumed=30000;
        restored.payments.set(1,restored.payments.get(0));rejects(()->restored.validate(alice),"Reused transaction history rejected");
        UUID corrupt=UUID.randomUUID();Files.writeString(world.resolve("data/outlandish_relics/"+corrupt+".json"),"{broken");
        RelicStore broken=new RelicStore(world);rejects(()->broken.get(corrupt),"Corrupt records fail closed instead of resetting");
        check(!broken.get(bob).complete(),"A teammate's completed record never unlocks another UUID");
        System.out.println(checks+" production rule/journal checks passed (not Minecraft).");
    }
}
