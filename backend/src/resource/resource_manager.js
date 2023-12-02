import { Map } from '../map/map.js';
import { Resource } from './resource.js';
import { Turn } from '../turn/turn.js';

export class ResourceManager {
    #gameAccess;
    #mapAccess;

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
        this.#mapAccess = globalContext.mapAccess();
    }

    #collectResource(game, player, position) {
        const resource = this.#mapAccess.getResourceAt(game, position[0], position[1]);

        if (resource && resource.age > 8) {
            player.inventory[resource.type]++;

            resource.age = -1;
        }
    }

    #collectResources(game) {
        const player = this.#gameAccess.getCurrentPlayer(game);

        this.#collectResource(game, player, player.position);

        for (const direction of Object.values(Turn.Direction)) {
            const position = [player.position[0] + direction.x, player.position[1] + direction.y];

            this.#collectResource(game, player, position);
        }
    }

    endTurn(game) {
        this.#collectResources(game);
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
