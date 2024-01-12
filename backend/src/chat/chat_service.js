import { GlobalContext } from '../lib/global_context.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Provides high-level functions for working with chat messages; e.g., send
 * chat messages.
 * <p>
 * Typically, service methods are invoked from controller classes. If you find
 * yourself calling service methods from repository classes or other service
 * classes, consider introducing a helper class.
 */

export class ChatService {
    #authn;
    #authz;
    #gameRepository;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#authn = globalContext.authn();
        this.#authz = globalContext.authz();
        this.#gameRepository = globalContext.gameRepository();
    }

    /**
     * Sends a chat message to all players.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {string} text the message to be sent
     */

    async sendMessage(sessionContext, text) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canSendMessage(game, player).orThrow();

        game.messages.push({
            player: sessionContext.playerId,
            text: text
        });

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }
};
