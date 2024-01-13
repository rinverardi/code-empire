import { Resource } from '../resource/resource.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Takes the inventories of a game and maps each internal representation to a
 * player-specific representation.
 * <p>
 * The player-specific representation excludes private elements from other
 * players.
 */

export class InventoryMapper {

    /**
     * Maps the inventories of a game.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} source the internal representation of the game
     * @returns {object} the player-specific representation of the game
     */

    mapInto(sessionContext, source, target) {
        for (let index = 0; index < source.players.length; index++) {
            const sourcePlayer = source.players[index];

            if (sourcePlayer.inventory) {
                const targetPlayer = target.players[index];

                if (sourcePlayer.id === sessionContext.playerId) {
                    targetPlayer.inventory = sourcePlayer.inventory;
                } else {
                    targetPlayer.inventory = { 'gold': sourcePlayer.inventory[Resource.Type.gold] };
                }
            }
        }
    };
};
