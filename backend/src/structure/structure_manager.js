import { ArrayHelper } from '../lib/array_helper.js';
import { GlobalConfig } from '../lib/global_config.js';
import { GlobalContext } from '../lib/global_context.js';
import { Resource } from '../resource/resource.js';
import { Structure } from './structure.js';
import { Turn } from '../turn/turn.js';

/**
 * Implement the structure-related aspects of the game logic (i.e., the rules
 * of the game).
 */

export class StructureManager {
    #gameAccess;
    #mapAccess;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
        this.#mapAccess = globalContext.mapAccess();
    }

    #collectResources(game) {
        const player = this.#gameAccess.getCurrentPlayer(game);

        const structures = game.structures
            .filter(that => that.player === player.id)
            .filter(that => Structure.Type[that.type].collectsResources);

        for (const structure of structures) {
            for (const direction of Object.values(Turn.Direction)) {
                const resource = this.#mapAccess.getResourceAt(
                    game,
                    structure.position[0] + direction.x,
                    structure.position[1] + direction.y);

                if (resource && resource.age >= GlobalConfig.resources.respawnAfter) {
                    player.inventory[resource.type]++;

                    resource.age = -1;
                }
            }
        }
    }

    #produceResources(game) {
        const player = this.#gameAccess.getCurrentPlayer(game);

        const structures = game.structures
            .filter(that => that.player === player.id)
            .filter(that => Structure.Type[that.type].producesResources);

        for (const structure of structures) {
            const resource = ArrayHelper.randomItem(Object.keys(Resource.Type));

            player.inventory[resource]++;
        }
    }

    /**
     * Handles the start of a turn.
     *
     * @param {object} game the game 
     */

    startTurn(game) {
        this.#collectResources(game);
        this.#produceResources(game);
    }
};
