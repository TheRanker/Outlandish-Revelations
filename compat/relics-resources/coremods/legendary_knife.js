function initializeCoreMod() {
    var O = Java.type('org.objectweb.asm.Opcodes');
    var Var = Java.type('org.objectweb.asm.tree.VarInsnNode');
    var Call = Java.type('org.objectweb.asm.tree.MethodInsnNode');
    var List = Java.type('org.objectweb.asm.tree.InsnList');
    return {
        outlandish_incense_knife: {
            target: {type: 'CLASS', name: 'wayoftime.bloodmagic.util.helper.PlayerSacrificeHelper'},
            transformer: function(node) {
                var matched = 0, returns = 0;
                for (var i = 0; i < node.methods.size(); i++) {
                    var method = node.methods.get(i);
                    if (method.name !== 'sacrificePlayerHealth' || method.desc !== '(Lnet/minecraft/world/entity/player/Player;)Z') continue;
                    matched++;
                    var nodes = method.instructions.toArray();
                    for (var j = 0; j < nodes.length; j++) if (nodes[j].getOpcode() === O.IRETURN) {
                        var hook = new List();
                        hook.add(new Var(O.ALOAD, 0));
                        hook.add(new Call(O.INVOKESTATIC, 'com/theranker/creativeguard/relics/RelicSystem', 'knifeFinished', '(Lnet/minecraft/world/entity/player/Player;)V', false));
                        method.instructions.insertBefore(nodes[j], hook);returns++;
                    }
                    method.maxStack++;
                }
                if (matched !== 1 || returns < 1) throw new Error('Outlandish: Blood Magic incense sacrifice layout changed; refusing an unverified hook');
                return node;
            }
        },
        outlandish_knife_recipient: {
            target: {type: 'CLASS', name: 'wayoftime.bloodmagic.common.tile.TileAltar'},
            transformer: function(node) {
                var matched = 0, returns = 0;
                for (var i = 0; i < node.methods.size(); i++) {
                    var method = node.methods.get(i);
                    if (method.name !== 'sacrificialDaggerCall' || method.desc !== '(IZ)V') continue;
                    matched++;
                    var nodes = method.instructions.toArray();
                    for (var j = 0; j < nodes.length; j++) if (nodes[j].getOpcode() === O.RETURN) {
                        var hook = new List();
                        hook.add(new Var(O.ALOAD, 0));hook.add(new Var(O.ILOAD, 1));hook.add(new Var(O.ILOAD, 2));
                        hook.add(new Call(O.INVOKESTATIC, 'com/theranker/creativeguard/relics/RelicSystem', 'knifeAltarReached', '(Lwayoftime/bloodmagic/common/tile/TileAltar;IZ)V', false));
                        method.instructions.insertBefore(nodes[j], hook);returns++;
                    }
                    method.maxStack += 3;
                }
                if (matched !== 1 || returns < 1) throw new Error('Outlandish: Blood Magic altar layout changed; refusing an unverified hook');
                return node;
            }
        },
        outlandish_final_knife: {
            target: {type: 'CLASS', name: 'wayoftime.bloodmagic.common.item.ItemSacrificialDagger'},
            transformer: function(node) {
                var matched = 0, returns = 0;
                for (var i = 0; i < node.methods.size(); i++) {
                    var method = node.methods.get(i);
                    if (method.name !== 'm_7203_' || method.desc !== '(Lnet/minecraft/world/level/Level;Lnet/minecraft/world/entity/player/Player;Lnet/minecraft/world/InteractionHand;)Lnet/minecraft/world/InteractionResultHolder;') continue;
                    matched++;
                    var nodes = method.instructions.toArray();
                    for (var j = 0; j < nodes.length; j++) if (nodes[j].getOpcode() === O.ARETURN) {
                        var hook = new List();
                        hook.add(new Var(O.ALOAD, 2));
                        hook.add(new Call(O.INVOKESTATIC, 'com/theranker/creativeguard/relics/RelicSystem', 'knifeFinished', '(Lnet/minecraft/world/entity/player/Player;)V', false));
                        method.instructions.insertBefore(nodes[j], hook);
                        returns++;
                    }
                    method.maxStack++;
                }
                if (matched !== 1 || returns < 1) throw new Error('Outlandish: Blood Magic knife layout changed; refusing an unverified hook');
                print('[Outlandish relics] Installed post-action knife observer; ordinary knife behavior preserved.');
                return node;
            }
        }
    };
}
