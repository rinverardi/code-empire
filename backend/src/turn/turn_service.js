import { GlobalContext } from '../lib/global_context.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Provides high-level methods for working with turns (e.g., execute turns,
 * skip turns).
 * <p>
 * Typically, service methods are invoked from controller classes. If you find
 * yourself calling service methods from other classes, consider introducing a
 * helper class.
 */

export class TurnService {
    #authn;
    #authz;
    #gameManager;
    #gameRepository;
    #highscoreService;
    #playerManager;
    #resourceManager;
    #structureManager;
    #turnManager;
    #visibilityManager;

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
        this.#resourceManager = globalContext.resourceManager();
        this.#structureManager = globalContext.structureManager();
        this.#turnManager = globalContext.turnManager();
        this.#visibilityManager = globalContext.visibilityManager();
    }

    #endTurn(game) {
        this.#playerManager.endTurn(game);
        this.#visibilityManager.endTurn(game);
        this.#turnManager.endTurn(game);

        this.#structureManager.startTurn(game);
        this.#resourceManager.startTurn(game);
        this.#turnManager.startTurn(game);
    }

    /**
     * Executes a turn and advances the game state.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {number} turn the turn index
     */

    async executeTurn(sessionContext, turn) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canExecuteTurn(game, player).orThrow();

        if (typeof turn === 'number') {
            this.#turnManager.executeTurn(game, game.turns[turn]);
        }

        this.#endTurn(game);

        const winner = this.#gameManager.determineWinner(game);

        if (winner) {
            this.#gameManager.endGame(game, winner);
            this.#highscoreService.submitScore(sessionContext, winner);
        }

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    /**
     * Skips a turn and advances the game state.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     */

    async skipTurn(sessionContext) {
        this.executeTurn(sessionContext, null);
    }
};
