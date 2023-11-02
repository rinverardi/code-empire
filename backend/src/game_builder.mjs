import { Game } from './game.mjs';
import { GlobalConfig } from './global_config.mjs';
import { Inventory } from './inventory.mjs';
import { Map } from './map.mjs';
import { Player } from './player.mjs';

export class GameBuilder {
    #playerBuilder;

    constructor(globalContext) {
        this.#playerBuilder = globalContext.playerBuilder();
    }

    buildGame(sessionContext, mapId, playerName) {
        const player = this.#playerBuilder.buildPlayer(sessionContext, playerName, Player.Role.master);

        return {
            id: sessionContext.gameId,
            map: {
                id: mapId
            },
            players: [player],
            status: Game.Status.waiting
        };
    }

    populateGame(game) {
        game.status = Game.Status.thinking;

        this.#populateMap(game);
        this.#populateMessages(game);
        this.#populatePlayers(game);
        this.#populateResources(game);
        this.#populateStructures(game);
        this.#populateTurn(game);
    }

    // TODO Extract me!

    #populateMap(game) {
        game.map.tiles = Map.Template[game.map.id];
    }

    // TODO Extract me!

    #populateMessages(game) {
        game.messages = []
    }

    // TODO Extract me!

    #populatePlayers(game) {
        for (const player of game.players) {
            player.health = GlobalConfig.playerHealth;
            player.inventory = {}
            player.position = [2, 1];
            player.visibility = game.map.tiles.map(that => that.replace(/[^ ]/g, Player.Visibility.none));

            for (const item in Inventory.Item) {
                player.inventory[item] = 0;
            }
        }
    }

    // TODO Extract me!

    #populateResources(game) {
        game.resources = [];
    }

    // TODO Extract me!

    #populateStructures(game) {
        game.structures = [];
    }

    // TODO Extract me!

    #populateTurn(game) {
        game.turn = {
            number: 1,
            player: game.players[0].id
        }
    }
};