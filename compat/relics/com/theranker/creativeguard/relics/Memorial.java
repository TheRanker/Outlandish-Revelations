package com.theranker.creativeguard.relics;

import net.minecraft.core.*;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceKey;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.*;
import net.minecraft.world.level.block.entity.BlockEntity;
import net.minecraft.world.level.levelgen.structure.Structure;

record Memorial(ServerLevel level,BlockPos anchor,Direction facing) {
    static final ResourceKey<Structure> STRUCTURE=ResourceKey.create(Registries.STRUCTURE,new ResourceLocation("outlandish:ranker_memorial"));
    BlockPos altar(){return anchor.above(2);}
    BlockPos plaque(){return anchor.relative(facing.getOpposite(),7).above(3);}
    String id(){return level.dimension().location()+":"+anchor.asLong();}
    static Memorial anchor(ServerLevel level,BlockPos pos){
        if(level.dimension()!=Level.OVERWORLD)return null;
        var state=level.getBlockState(pos);if(!state.is(Blocks.BARREL))return null;
        BlockEntity tile=level.getBlockEntity(pos);if(tile==null||!AltarAccess.tags(tile).getBoolean("outlandishMemorialAnchor"))return null;
        if(!level.structureManager().getStructureWithPieceAt(pos,STRUCTURE).isValid())return null;
        Direction facing=state.getValue(BarrelBlock.FACING);if(facing.getAxis().isVertical())return null;
        return new Memorial(level,pos.immutable(),facing);
    }
    static Memorial atPlaque(ServerLevel level,BlockPos clicked){
        if(level.dimension()!=Level.OVERWORLD||!level.getBlockState(clicked).is(Blocks.DARK_OAK_PLANKS))return null;
        if(!level.structureManager().getStructureWithPieceAt(clicked,STRUCTURE).isValid())return null;
        for(Direction face:Direction.Plane.HORIZONTAL)for(int dy=0;dy<=1;dy++)for(int dx=-1;dx<=1;dx++){
            BlockPos pos=clicked.relative(face,7).below(3+dy).relative(face.getClockWise(),dx);Memorial m=anchor(level,pos);if(m!=null&&m.facing()==face)return m;
        }
        return null;
    }
}
