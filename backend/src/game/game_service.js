import { Game } from './game.js';
import { GlobalContext } from '../lib/global_context.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Provides high-level methods for working with games (e.g., abort games,
 * create games, load games and watch for changes, start games).
 * <p>
 * Typically, service methods are invoked from controller classes. If you find
 * yourself calling service methods from other classes, consider introducing a
 * helper class.
 */

export class GameService {
    #authn;
    #authz;
    #gameManager;
    #gameMapper;
    #gameRepository;
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
        this.#gameMapper = globalContext.gameMapper();
        this.#gameRepository = globalContext.gameRepository();
        this.#turnManager = globalContext.turnManager();
    }

    /**
     * Aborts a game in the pre-game phase.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     */

    async abortGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canAbortGame(game, player).orThrow();

        game.status = Game.Status.aborted;

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    /**
     * Creates a game in the pre-game phase.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {number} mapId the map for the game
     * @param {string} playerName the nickname for the game master
     */

    async createGame(sessionContext, mapId, playerName) {
        const game = this.#gameManager.buildGame(sessionContext, mapId, playerName);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    /**
     * Loads a game from the database.
     * <p>
     * The session context is used to identity the current player. Only game
     * elements that are visible to that player are mapped and returned.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @returns {Promise} the game
     */

    async loadGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);

        return game
            ? this.#gameMapper.map(sessionContext, game)
            : { status: Game.Status.missing };
    }

    /**
     * Loads games from the database that are awaiting more players.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @returns {Promise} the game
     */

    async loadGameList(sessionContext) {
        const gameList = await this.#gameRepository.loadGameList(sessionContext);

        return gameList
            .filter(that => that.status === Game.Status.waiting)
            .map(that => this.#gameMapper.map(sessionContext, that));
    }

    /**
     * Starts a game and transfers it from the pre-game phase to the in-game
     * phase.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     */

    async startGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canStartGame(game, player).orThrow();

        this.#gameManager.startGame(game);
        this.#turnManager.startTurn(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    /**
     * Watches a game, detects changes, and invokes a callback for every
     * change.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {function} onUpdate called for every change
     */

    async watchGame(sessionContext, onUpdate) {
        await this.#gameRepository.subscribeGame(sessionContext, game => {
            const parsedGame = JSON.parse(game);
            const mappedGame = this.#gameMapper.map(sessionContext, parsedGame);

            onUpdate(mappedGame);
        });

        onUpdate(await this.loadGame(sessionContext));
    }

    /**
     * Watches games that are awaiting more players, detects changes, and
     * invokes a callback for every change.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {function} onUpdate called for every change
     */

    async watchGameList(sessionContext, onUpdate) {
        await this.#gameRepository.subscribeGameList(sessionContext, game => {
            const parsedGame = JSON.parse(game);
            const mappedGame = this.#gameMapper.map(sessionContext, parsedGame);

            onUpdate(mappedGame);
        });

        const gameList = await this.loadGameList(sessionContext);

        for (const game of gameList) {
            onUpdate(game);
        }
    }
};
