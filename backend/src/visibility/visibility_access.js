import { StringHelper } from '../lib/string_helper.js';

/**
 * Provides a helper method for setting the visibility for a player at a
 * position.
 */

export class VisibilityAccess {

    /**
     * Sets the visibility for a player at a position.
     *
     * @param {object} player the player
     * @param {number} x the x-coordinate of the position
     * @param {number} y the y-coordinate of the position
     * @param {string} visibility the visibility
     */

    setVisibilityAt(player, x, y, visibility) {
        player.visibility[y] = StringHelper.replaceAt(player.visibility[y], x, visibility);
    }
};
