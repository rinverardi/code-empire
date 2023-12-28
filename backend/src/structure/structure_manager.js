import { ArrayHelper } from '../lib/array_helper.js';
import { Resource } from '../resource/resource.js';
import { Structure } from './structure.js';
import { Turn } from '../turn/turn.js';

export class StructureManager {
    #gameAccess;
    #mapAccess;

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

                // TODO Use a constant!

                if (resource && resource.age > 8) {
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

    startTurn(game) {
        this.#collectResources(game);
        this.#produceResources(game);
    }
};
