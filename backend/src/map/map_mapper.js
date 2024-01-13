import { GlobalContext } from '../lib/global_context.js';
import { SessionContext } from '../lib/session_context.js';
import { Visibility } from '../visibility/visibility.js';

/**
 * Takes the map of a game and maps its internal representation to a
 * player-specific representation.
 * <p>
 * The player-specific representation excludes obscured elements (i.e.,
 * elements still covered by the fog of war).
 */

export class MapMapper {
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

    #applyVisibility(tiles, visibility) {
        for (let y = 0; y < tiles.length; y++) {
            let row = '';

            for (let x = 0; x < tiles[y].length; x++) {
                if (tiles[y][x] === ' ') {
                    row += ' ';
                } else {
                    row += visibility[y][x] === Visibility.clear ? tiles[y][x] : '-';
                }
            }

            tiles[y] = row;
        }
    }

    /**
     * Maps the map of a game.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} source the internal representation of the game
     * @returns {object} the player-specific representation of the game
     */

    mapInto(sessionContext, source, target) {
        target.map = { id: source.map.id };

        if (source.map.tiles) {
            const visibility = this.#gameAccess.getVisibility(sessionContext, source);

            if (visibility) {
                target.map.tiles = source.map.tiles;

                this.#applyVisibility(target.map.tiles, visibility);
            }
        }
    }
};
