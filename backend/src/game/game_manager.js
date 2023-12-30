import { Game } from './game.js';
import { Map } from '../map/map.js';
import { Player } from '../player/player.js';

export class GameManager {
    #playerAccess;
    #playerManager;
    #resourceManager;
    #turnManager;
    #visibilityManager;

    constructor(globalContext) {
        this.#playerAccess = globalContext.playerAccess();
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

    determineWinner(game) {
        const players = game.players.filter(that => that.status === Player.Status.alive);

        for (const player of players) {
            const scoreGold = this.#playerAccess.countGold(player);
            const scoreMetropolises = this.#playerAccess.countMetropolises(game, player);

            // TODO Use a constant!

            if (scoreGold > 99) {
                return {
                    objective: Game.Objective.haveGold,
                    player: player.id,
                    scoreGold,
                    scoreMetropolises
                };
            }

            // TODO Use a constant!

            if (scoreMetropolises > 2) {
                return {
                    objective: Game.Objective.haveMetropolises,
                    player: player.id,
                    scoreGold,
                    scoreMetropolises
                };
            }
        }

        if (players.length < 2) {
            return {
                objective: Game.Objective.survive,
                player: players[0].id,
                scoreGold: this.#playerAccess.countGold(players[0]),
                scoreMetropolises: this.#playerAccess.countMetropolises(game, players[0])
            };
        }
    }

    // TODO Implement me!

    endGame(game, winner) {
        game.status = Game.Status.ended;
        game.winner = winner;
    }

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
