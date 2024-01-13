import { SessionContext } from '../lib/session_context.js';

/**
 * Takes the turns of a game and maps each representation to a player-specific
 * representation.
 * <p>
 * The player-specific representation excludes private elements from other
 * players.
 */

export class TurnMapper {

    /**
     * Maps the turns of a game.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} source the internal representation of the game
     * @returns {object} the player-specific representation of the game
     */

    mapInto(sessionContext, source, target) {
        if (source.turn) {
            target.turn = {
                id: source.turn.id,
                player: source.turn.player
            };

            if (sessionContext.playerId === source.turn.player) {
                target.turns = source.turns;
            }
        }
    }
};
