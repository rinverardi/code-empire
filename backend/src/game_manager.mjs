import { Game } from './game.mjs';
import { Map } from './map.mjs';
import { Player } from './player.mjs';

export class GameManager {
    #playerManager;
    #turnManager;

    constructor(globalContext) {
        this.#playerManager = globalContext.playerManager();
        this.#turnManager = globalContext.turnManager();
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
    }

    // TODO Implement me!

    startRound() { }

    // TODO Implement me!

    startTurn() { }
};