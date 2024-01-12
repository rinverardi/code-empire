import { Game } from '../game/game.js';
import { GlobalConfig } from '../lib/global_config.js';
import { GlobalContext } from '../lib/global_context.js';
import { Player } from './player.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Provides high-level functions for working with players; e.g., forfeit games,
 * join games, leave games.
 * <p>
 * Typically, service methods are invoked from controller classes. If you find
 * yourself calling service methods from repository classes or other service
 * classes, consider introducing a helper class.
 */

export class PlayerService {
    #authn;
    #authz;
    #gameManager;
    #gameRepository;
    #highscoreService;
    #playerManager;
    #turnManager;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#authn = globalContext.authn();
        this.#authz = globalContext.authz();
        this.#gameManager = globalContext.gameManager();
        this.#gameRepository = globalContext.gameRepository();
        this.#highscoreService = globalContext.highscoreService();
        this.#playerManager = globalContext.playerManager();
        this.#turnManager = globalContext.turnManager();
    }

    #autoStart(game) {
        const players = game.players.filter(that => that.status === Player.Status.alive);

        if (players.length >= GlobalConfig.slots.maxPlayers) {
            this.#gameManager.startGame(game);
            this.#turnManager.startTurn(game);
        }
    }

    /**
     * Removes a player from the game when the player forfeits.
     * <p>
     * This action is only possible during the in-game phase.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     */

    async forfeitGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canForfeitGame(game).orThrow();

        const playerIndex = game.players.findIndex(that => that.id === game.turn.player);

        game.players[playerIndex] = {
            id: player.id,
            status: Player.Status.forfeited
        };

        const winner = this.#gameManager.determineWinner(game);

        if (winner) {
            this.#gameManager.endGame(game, winner);
            this.#highscoreService.submitScore(sessionContext, winner);
        } else {
            this.#turnManager.endTurn(game);
            this.#turnManager.startTurn(game);
        }

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    /**
     * Adds a player to the game when the player joins.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     */

    async joinGame(sessionContext, playerName) {
        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#authz.canJoinGame(game, playerName).orThrow();

        game.players = game.players.filter(that => that.id !== sessionContext.playerId);

        const player = this.#playerManager.buildPlayer(sessionContext, playerName, Player.Role.participant);

        game.players.push(player);

        this.#autoStart(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    /**
     * Removes a player from the game when the player leaves.
     * <p>
     * This action is only possible during the pre-game phase.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     */

    async leaveGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canLeaveGame(game).orThrow();

        game.players = game.players.filter(that => that.id !== player.id);

        game.players.push({
            id: player.id,
            status: Player.Status.left
        });

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }
};
