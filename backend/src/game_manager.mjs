import { Game } from './game.mjs';
import { Map } from './map.mjs';
import { Player } from './player.mjs';

export class GameManager {
    #playerManager;
    #turnManager;
    #visibilityManager;

    constructor(globalContext) {
        this.#playerManager = globalContext.playerManager();
        this.#turnManager = globalContext.turnManager();
        this.#visibilityManager = globalContext.visibilityManager();
    }

    buildGame(sessionContext, mapId, playerName) {
        const game = {
            id: sessionContext.gameId,
            map: {
                id: mapId
            },
            players: [],
            status: Game.Status.waiting
        };

        const player = this.#playerManager.buildPlayer(sessionContext, playerName, Player.Role.master);

        game.players.push(player);

        return game;
    }

    // TODO Implement me!

    endGame(game) { }

    // TODO Implement me!

    endTurn(game) { }

    startGame(game) {
        game.map.tiles = Map.Template[game.map.id];
        game.messages = []
        game.resources = [];
        game.status = Game.Status.thinking;
        game.structures = [];

        this.#playerManager.startGame(game);
        this.#turnManager.startGame(game);
        this.#visibilityManager.startGame(game);
    }

    // TODO Implement me!

    startRound(game) { }

    // TODO Implement me!

    startTurn(game) { }
};