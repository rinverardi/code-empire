import { Map } from '../map/map.js';
import { Resource } from './resource.js';

export class ResourceManager {
    #mapAccess;

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

    startGame(game) {
        for (const type in Resource.Type) {
            for (let count = 0; count < 3; count++) {
                const resource = {
                    age: Resource.Constants.respawnTime,
                    position: this.#pickPosition(game),
                    type: type
                };

                game.resources.push(resource);
            }
        }
    }

    startTurn(game) {
        for (const resource of game.resources) {
            resource.age++;
        }
    }
};
