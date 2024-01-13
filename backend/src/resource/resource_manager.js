import { GlobalConfig } from '../lib/global_config.js';
import { GlobalContext } from '../lib/global_context.js';
import { Map } from '../map/map.js';
import { Resource } from './resource.js';

/**
 * Implement the resource-related aspects of the game logic (i.e., the rules of
 * the game).
 */

export class ResourceManager {
    #mapAccess;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#mapAccess = globalContext.mapAccess();
    }

    #pickPosition(game) {
        while (true) {
            const position = this.#mapAccess.pickPosition(game);
            const tile = this.#mapAccess.getTileAt(game, ...position);

            if ([Map.Tile.forest, Map.Tile.grass, Map.Tile.hill].includes(tile)) {
                const player = this.#mapAccess.getPlayerAt(game, ...position);
                const resource = this.#mapAccess.getResourceAt(game, ...position);

                if (!player && !resource) {
                    return position;
                }
            }
        }
    }

    /**
     * Handles the start of a game.
     *
     * @param {object} game the game 
     */

    startGame(game) {
        for (const type in Resource.Type) {
            for (let count = 0; count < 3; count++) {
                const resource = {
                    age: GlobalConfig.resources.respawnAfter,
                    position: this.#pickPosition(game),
                    type: type
                };

                game.resources.push(resource);
            }
        }
    }

    /**
     * Handles the start of a turn.
     *
     * @param {object} game the game 
     */

    startTurn(game) {
        for (const resource of game.resources) {
            resource.age++;
        }
    }
};
