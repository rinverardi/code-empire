import { GlobalContext } from '../lib/global_context.js';
import { SessionContext } from '../lib/session_context.js';
import { Visibility } from '../visibility/visibility.js';

/**
 * Takes the players of a game and maps each internal representation to a
 * player-specific representation.
 * <p>
 * The player-specific representation excludes obscured elements (i.e.,
 * elements still covered by the fog of war).
 */

export class PlayerMapper {
    #gameAccess;
    #inventoryMapper;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
        this.#inventoryMapper = globalContext.inventoryMapper();
    }

    #applyVisibility(source, target, visibility) {
        for (let index = 0; index < source.players.length; index++) {
            const position = source.players[index].position;

            if (position && visibility[position[1]][position[0]] === Visibility.clear) {
                target.players[index].position = position;
            }
        }
    }

    /**
     * Maps the players of a game.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} source the internal representation of the game
     * @returns {object} the player-specific representation of the game
     */

    mapInto(sessionContext, source, target) {
        target.players = [];

        for (const sourcePlayer of source.players) {
            const targetPlayer = {
                health: sourcePlayer.health,
                id: sourcePlayer.id,
                name: sourcePlayer.name,
                role: sourcePlayer.role,
                status: sourcePlayer.status
            };

            target.players.push(targetPlayer);
        }

        const visibility = this.#gameAccess.getVisibility(sessionContext, source);

        if (visibility) {
            this.#applyVisibility(source, target, visibility);
        }

        this.#inventoryMapper.mapInto(sessionContext, source, target);
    }
};
