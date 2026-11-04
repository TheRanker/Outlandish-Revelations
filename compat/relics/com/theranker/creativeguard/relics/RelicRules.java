package com.theranker.creativeguard.relics;

/** Game-independent rules: HP (not hearts), and 20 server ticks per second. */
public final class RelicRules {
    private RelicRules() {}
    public static final String SWORD="kubejs:rankers_sword", RING="kubejs:rankers_ring", TAG="outlandish_relic";
    public static final int OFFERING=10000, OFFERINGS=3, TOTAL_LP=30000, MAX_RESONANCE=100;
    public static final int FRACTURE_TICKS=60, MELEE_GAIN_INTERVAL=10, COMBAT_IDLE=300;
    public static final int ECHO_COST=45, ECHO_COOLDOWN=240, ECHO_DELAY=12;
    public static final int SKY_COST=75, SKY_COOLDOWN=400, PROTECTION_COOLDOWN=1800, LAST_STAND_COOLDOWN=12000;
    public static final double SKY_RADIUS=4.5,PULSE_RADIUS=4;
    public static final float SKY_DAMAGE=12;
    public static boolean finitePositive(double v){return Double.isFinite(v)&&v>0;}
    public static double fracture(double hit){return finitePositive(hit)?Math.min(12,hit*.35):0;}
    public static double echo(double hit){return finitePositive(hit)?Math.min(14,hit*.40):0;}
    public static boolean dangerous(double hit,double maxHealth){return finitePositive(hit)&&finitePositive(maxHealth)&&hit>=maxHealth*.30;}
    public static double protectedDamage(double hit){return finitePositive(hit)?hit*.75:0;}
    public static float restoredHealth(double maxHealth){return finitePositive(maxHealth)?(float)Math.min(10,maxHealth*.20):0;}
    public static int resonance(int current,int gain){return Math.max(0,Math.min(MAX_RESONANCE,current+gain));}
    public static boolean paid(int stages,int lp){return stages>=0&&stages<=OFFERINGS&&lp==stages*OFFERING;}
}
