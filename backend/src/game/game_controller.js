import { Action } from '../action/action.js';
import { GlobalContext } from '../lib/global_context.js';
import { Logger } from '../lib/logger.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Acts as an interface between the WebSocket connection and the game logic:
 *
 * <ul>
 *   <li>When the connection is opened, it is tied to one or more game states.
 *   <li>Inbound messages are used to update the game states.
 *   <li>Outbound messages notify clients about changes to the game states.
 * </ul>
 */

export class GameController {
    #chatService;
    #gameService;
    #playerService;
    #turnService;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#chatService = globalContext.chatService();
        this.#gameService = globalContext.gameService();
        this.#playerService = globalContext.playerService();
        this.#turnService = globalContext.turnService();
    }

    /**
     * Manages the communication related to the current game.
     * <p>
     * Used both in the pre-game-phase (i.e., during match making) and in the
     * in-game-phase (i.e., while actually playing).
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     */

    async watchGame(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        wsConnection.on('message', async wsMessage => {
            try {
                const action = JSON.parse(wsMessage);

                switch (action.id) {
                    case Action.abortGame:
                        await this.#gameService.abortGame(sessionContext);
                        break;

                    case Action.createGame:
                        await this.#gameService.createGame(sessionContext, action.map.id, action.player.name);
                        break;

                    case Action.executeTurn:
                        await this.#turnService.executeTurn(sessionContext, action.turn);
                        break;

                    case Action.forfeitGame:
                        await this.#playerService.forfeitGame(sessionContext);
                        break;

                    case Action.joinGame:
                        await this.#playerService.joinGame(sessionContext, action.player.name);
                        break;

                    case Action.leaveGame:
                        await this.#playerService.leaveGame(sessionContext);
                        break;

                    case Action.sendMessage:
                        await this.#chatService.sendMessage(sessionContext, action.text);
                        break;

                    case Action.skipTurn:
                        await this.#turnService.skipTurn(sessionContext);
                        break;

                    case Action.startGame:
                        await this.#gameService.startGame(sessionContext);
                        break;

                    default:
                        throw new RangeError('No such action');
                }
            } catch (exception) {
                Logger.e('GameController.watchGame()', exception);
            }
        });

        await this.#gameService.watchGame(sessionContext, game => {
            wsConnection.send(JSON.stringify(game));
        });
    }

    /**
     * Manages the communication for all games.
     * <p>
     * Only used in the pre-game-phase (i.e., during match making).
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     */

    async watchGameList(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        await this.#gameService.watchGameList(sessionContext, gameList => {
            wsConnection.send(JSON.stringify(gameList));
        });
    }
};
