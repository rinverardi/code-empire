import { Player } from '../player/player.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Provides helper methods for accessing specific elements of a game (e.g.,
 * getting the current player, getting the next player, getting the visibility
 * of a player).
 */

export class GameAccess {

    /**
     * Gets the current player (i.e., the player whose turn it is now).
     *
     * @param {object} game the game
     * @returns {object} the player
     */

    getCurrentPlayer(game) {
        for (const player of game.players) {
            if (player.id === game.turn.player) {
                return player;
            }
        }
    }

    /**
     * Gets the next player (i.e., the player whose turn it is next).
     *
     * @param {object} game the game 
     * @returns {object} the player
     */

    getNextPlayer(game) {
        const currentIndex = game.players.findIndex(that => that.id === game.turn.player);

        for (var nextIndex = currentIndex + 1; nextIndex !== currentIndex; nextIndex++) {
            if (nextIndex >= game.players.length) {
                nextIndex = 0;
            }

            const player = game.players[nextIndex];

            if (player.status === Player.Status.alive) {
                return player;
            }
        }
    }

    /**
     * Gets the visibility for the connected player (i.e., the player on the
     * other side of the WebSocket connection).
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} game the game
     * @returns {object} the visibility
     */

    getVisibility(sessionContext, game) {
        for (const player of game.players) {
            if (player.id === sessionContext.playerId) {
                return player.visibility;
            }
        }
    }
};
