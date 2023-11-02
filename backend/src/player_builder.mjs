import { GlobalConfig } from './global_config.mjs';
import { Inventory } from './inventory.mjs';
import { Player } from './player.mjs';

export class PlayerBuilder {
    buildPlayer(sessionContext, playerName, playerRole) {
        return {
            id: sessionContext.playerId,
            name: playerName,
            role: playerRole,
            status: Player.Status.alive,
            secret: sessionContext.playerSecret
        };
    }

    populatePlayer(player) {
        player.health = GlobalConfig.playerHealth;
        player.inventory = {}

        // TODO Fix me!

        player.position = [2, 1];

        for (const item in Inventory.Item) {
            player.inventory[item] = 0;
        }
    }

    populatePlayerList(game) {
        for (const player of game.players) {
            this.populatePlayer(player);

            player.visibility = game.map.tiles.map(that => that.replace(/[^ ]/g, Player.Visibility.none));
        }
    }
};