import { Resource } from '../resource/resource.mjs';

export class InventoryMapper {
    mapInto(sessionContext, source, target) {
        for (let index = 0; index < source.players.length; index++) {
            const sourcePlayer = source.players[index];
            const targetPlayer = target.players[index];

            if (sourcePlayer.id === sessionContext.playerId) {
                targetPlayer.inventory = sourcePlayer.inventory;
            } else {
                targetPlayer.inventory = { 'gold': sourcePlayer.inventory[Resource.Type.gold] };
            }
        }
    }; 5
};