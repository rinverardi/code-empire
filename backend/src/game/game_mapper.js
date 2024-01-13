import { GlobalContext } from '../lib/global_context.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Maps the internal representation of a game to a player-specific
 * representation.
 * <p>
 * The player-specific representation excludes private elements from other
 * players as well as obscured elements (i.e., elements still covered by the
 * fog of war).
 */

export class GameMapper {
    #mapMapper;
    #playerMapper;
    #resourceMapper;
    #structureMapper;
    #turnMapper;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#mapMapper = globalContext.mapMapper();
        this.#playerMapper = globalContext.playerMapper();
        this.#resourceMapper = globalContext.resourceMapper();
        this.#structureMapper = globalContext.structureMapper();
        this.#turnMapper = globalContext.turnMapper();
    }

    /**
     * Maps a game.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} source the internal representation of the game
     * @returns {object} the player-specific representation of the game
     */

    map(sessionContext, source) {
        const target = {
            id: source.id,
            messages: source.messages,
            notifications: source.notifications,
            status: source.status,
            winner: source.winner
        };

        this.#mapMapper.mapInto(sessionContext, source, target);
        this.#playerMapper.mapInto(sessionContext, source, target);
        this.#resourceMapper.mapInto(sessionContext, source, target);
        this.#structureMapper.mapInto(sessionContext, source, target);
        this.#turnMapper.mapInto(sessionContext, source, target);

        return target;
    }
};
