import { Game } from './game.mjs';
import { Map } from './map.mjs';
import { Player } from './player.mjs';

export class GameManager {
    #playerManager;

    constructor(globalContext) {
        this.#playerManager = globalContext.playerManager();
    }

    buildGame(sessionContext, mapId, playerName) {
        const player = this.#playerManager.buildPlayer(sessionContext, playerName, Player.Role.master);

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
        this.#populateResources(game);
        this.#populateStructures(game);
        this.#populateTurn(game);

        this.#playerManager.populatePlayers(game);
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