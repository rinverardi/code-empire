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

        if (resource && resource.age >= GlobalConfig.resources.respawnAfter) {
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

        if (players.length < GlobalConfig.slots.minPlayers) {
            throw new RangeError('Too few players');
        }

        if (players.length > GlobalConfig.slots.maxPlayers) {
            throw new RangeError('Too many players');
        }

        for (const player of players) {
            player.health = GlobalConfig.players.initialHealth;
            player.inventory = this.#inventoryManager.buildInventory();
            player.position = this.#pickPosition(game);
        }
    }
};
