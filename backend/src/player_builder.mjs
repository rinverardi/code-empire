import { GlobalConfig } from './global_config.mjs';
import { Inventory } from './inventory.mjs';
import { Player } from './player.mjs';

export class PlayerBuilder {
    #inventoryBuilder;

    constructor(globalContext) {
        this.#inventoryBuilder = globalContext.inventoryBuilder();
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

    populatePlayers(game) {
        for (const player of game.players) {
            player.health = GlobalConfig.playerHealth;
            player.inventory = this.#inventoryBuilder.buildInventory();

            // TODO Fix me!

            player.position = [2, 1];

            // TODO Fix me!

            player.visibility = game.map.tiles.map(that => that.replace(/[^ ]/g, Player.Visibility.none));
        }
    }
};