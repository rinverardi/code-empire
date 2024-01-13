import { GlobalContext } from '../lib/global_context.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Acts as an interface between the WebSocket connection and the highscore
 * logic:
 *
 * <ul>
 *   <li> Inbound messages are not supported.
 *   <li> Outbound messages notify clients about changes to the highscores.
 * </ul>
 */

export class HighscoreController {
    #highscoreService;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#highscoreService = globalContext.highscoreService();
    }

    /**
     * Manages the communication related to the current highscores.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     */

    async watchHighscores(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        await this.#highscoreService.watchHighscores(sessionContext, highscores => {
            wsConnection.send(JSON.stringify(highscores));
        });
    }
};
