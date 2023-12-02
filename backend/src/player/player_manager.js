import { GlobalConfig } from '../lib/global_config.js';
import { Map } from '../map/map.js';
import { Player } from './player.js';

export class PlayerManager {
    #inventoryManager;
    #mapAccess;

    constructor(globalContext) {
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
        for (const player of game.players) {
            player.health = GlobalConfig.playerHealth;
            player.inventory = this.#inventoryManager.buildInventory();
            player.position = this.#pickPosition(game);
        }
    }
};
