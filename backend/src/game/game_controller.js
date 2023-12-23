import { Action } from '../action/action.js';
import { Logger } from '../lib/logger.js';

export class GameController {
    #chatService;
    #gameService;
    #playerService;
    #turnService;

    constructor(globalContext) {
        this.#chatService = globalContext.chatService();
        this.#gameService = globalContext.gameService();
        this.#playerService = globalContext.playerService();
        this.#turnService = globalContext.turnService();
    }

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

    async watchGameList(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        await this.#gameService.watchGameList(sessionContext, gameList => {
            wsConnection.send(JSON.stringify(gameList));
        });
    }
};
