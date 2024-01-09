import { GlobalConfig } from '../lib/global_config.js';
import { Map } from '../map/map.js';
import { Player } from './player.js';

export class PlayerManager {
    #gameAccess;
    #inventoryManager;
    #mapAccess;

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
        this.#inventoryManager = globalContext.inventoryManager();
        this.#mapAccess = globalContext.mapAccess();
    }

    buildPlayer(sessionContext, playerName, playerRole) {
        return {
            id: sessionContext.playerId,
            name: playerName,
            role: playerRole,
            status: Player.Status.alive,
            secret: sessionContext.playerSecret
        };
    }

    #collectResources(game) {
        const player = this.#gameAccess.getCurrentPlayer(game);
        const resource = this.#mapAccess.getResourceAt(game, ...player.position);

        // TODO Use a constant!

        if (resource && resource.age > 8) {
            player.inventory[resource.type]++;

            resource.age = -1;
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

                if (!player) {
                    return position;
                }
            }
        }
    }

    startGame(game) {
        const players = game.players.filter(that => that.status === Player.Status.alive);

        // TODO Use a constant!

        if (players.length < 2) {
            throw new RangeError('Too few players');
        }

        // TODO Use a constant!

        if (players.length > 4) {
            throw new RangeError('Too many players');
        }

        for (const player of players) {
            player.health = GlobalConfig.game.player.initialHealth;
            player.inventory = this.#inventoryManager.buildInventory();
            player.position = this.#pickPosition(game);
        }
    }
};
