import { Game } from './game.js';
import { Map } from '../map/map.js';
import { Player } from '../player/player.js';

export class GameManager {
    #playerManager;
    #resourceManager;
    #turnManager;
    #visibilityManager;

    constructor(globalContext) {
        this.#playerManager = globalContext.playerManager();
        this.#resourceManager = globalContext.resourceManager();
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

    startGame(game) {
        game.map.tiles = Map.Template[game.map.id];
        game.messages = []
        game.resources = [];
        game.status = Game.Status.running;
        game.structures = [];

        this.#playerManager.startGame(game);
        this.#resourceManager.startGame(game);
        this.#turnManager.startGame(game);
        this.#visibilityManager.startGame(game);
    }
};
