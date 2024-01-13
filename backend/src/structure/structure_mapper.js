import { ArrayHelper } from '../lib/array_helper.js';
import { GlobalContext } from '../lib/global_context.js';
import { SessionContext } from '../lib/session_context.js';
import { Visibility } from '../visibility/visibility.js';

/**
 * Takes the structures of a game and maps each representation to a
 * player-specific representation.
 * <p>
 * The player-specific representation excludes obscured elements (i.e.,
 * elements still covered by the fog of war).
 */

export class StructureMapper {
    #gameAccess;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
    }

    #applyVisibility(structures, visibility) {
        ArrayHelper.filterInPlace(structures, that => {
            let [x, y] = that.position;

            return visibility[y][x] === Visibility.clear;
        });
    }

    /**
     * Maps the structures of a game.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} source the internal representation of the game
     * @returns {object} the player-specific representation of the game
     */

    mapInto(sessionContext, source, target) {
        target.structures = [];

        const visibility = this.#gameAccess.getVisibility(sessionContext, source);

        if (visibility) {
            target.structures.push(...source.structures);

            this.#applyVisibility(target.structures, visibility);
        }
    }
};
