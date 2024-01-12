import { SessionContext } from './session_context.js';

/**
 * Provides a method for authenticating the current player.
 */

export class Authn {

    /**
     * Authenticates and returns the current player.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} game the game state
     * @returns {object} the player
     * @throws {AuthnError} if authentication fails
     */

    getPlayer(sessionContext, game) {
        for (const player of game.players) {
            if (player.id === sessionContext.playerId) {
                return player;
            }
        }

        throw new AuthnError('No such player');
    }
}

export class AuthnError extends Error {
    constructor(message) {
        super(message);

        this.name = 'AuthnError';
    }
}
