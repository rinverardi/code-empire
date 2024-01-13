import { Game } from './game.js';
import { GlobalConfig } from '../lib/global_config.js';
import { GlobalContext } from '../lib/global_context.js';
import { Map } from '../map/map.js';
import { Player } from '../player/player.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Collaborates with the other manager classes to implement the actual game
 * logic (i.e., the rules of the game).
 */

export class GameManager {
    #playerAccess;
    #playerManager;
    #resourceManager;
    #turnManager;
    #visibilityManager;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#playerAccess = globalContext.playerAccess();
        this.#playerManager = globalContext.playerManager();
        this.#resourceManager = globalContext.resourceManager();
        this.#turnManager = globalContext.turnManager();
        this.#visibilityManager = globalContext.visibilityManager();
    }

    /**
     * Builds a new game.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {number} mapId the map for the game
     * @param {string} playerName the nickname for the game master
     * @returns {object} the game
     */

    buildGame(sessionContext, mapId, playerName) {
        const game = {
            id: sessionContext.gameId,
            map: {
                id: mapId
            },
            notifications: [],
            players: [],
            status: Game.Status.waiting
        };

        const player = this.#playerManager.buildPlayer(sessionContext, playerName, Player.Role.master);

        game.players.push(player);

        return game;
    }

    /**
     * Determines if a player has reached a game objective.
     *
     * @param {object} game the game
     * @returns {object} the winner or null
     */

    determineWinner(game) {
        const players = game.players.filter(that => that.status === Player.Status.alive);

        for (const player of players) {
            const scoreGold = this.#playerAccess.countGold(player);
            const scoreMetropolises = this.#playerAccess.countMetropolises(game, player);

            if (scoreGold >= GlobalConfig.objectives.haveGold) {
                return {
                    objective: Game.Objective.haveGold,
                    player: player.id,
                    scoreGold,
                    scoreMetropolises
                };
            }

            if (scoreMetropolises >= GlobalConfig.objectives.haveMetropolises) {
                return {
                    objective: Game.Objective.haveMetropolises,
                    player: player.id,
                    scoreGold,
                    scoreMetropolises
                };
            }
        }

        if (players.length < GlobalConfig.slots.minPlayers) {
            return {
                objective: Game.Objective.survive,
                player: players[0].id,
                scoreGold: this.#playerAccess.countGold(players[0]),
                scoreMetropolises: this.#playerAccess.countMetropolises(game, players[0])
            };
        }
    }

    /**
     * Handles the end of a game.
     *
     * @param {object} game the game 
     * @param {object} winner the winner 
     */

    endGame(game, winner) {
        game.status = Game.Status.ended;
        game.winner = winner;
    }

    /**
     * Handles the start of a game.
     *
     * @param {object} game the game 
     * @param {object} winner the winner 
     */

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
