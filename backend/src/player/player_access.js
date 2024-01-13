import { Resource } from '../resource/resource.js';
import { Structure } from '../structure/structure.js';

/**
 * Provides helper methods for accessing specific elements of a player (e.g.,
 * counting the gold, counting the metropolises).
 */

export class PlayerAccess {

    /**
     * Count the gold pieces that the player owns.
     *
     * @param {object} player the player object
     * @returns {number} the number of gold pieces
     */

    countGold(player) {
        return player.inventory[Resource.Type.gold];
    }

    /**
     * Count the metropolises that the player owns.
     *
     * @param {object} game the game object
     * @param {object} player the player object
     * @returns {number} the number of metropolises
     */

    countMetropolises(game, player) {
        return game.structures
            .filter(that => that.player === player.id)
            .filter(that => that.type === Structure.Type.metropolis.value)
            .length;
    }
};
