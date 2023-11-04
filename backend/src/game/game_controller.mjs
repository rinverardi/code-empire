import { Action } from '../action/action.mjs';
import { Logger } from '../lib/logger.mjs';

export class GameController {
    #gameService;
    #playerService;

    constructor(globalContext) {
        this.#gameService = globalContext.gameService();
        this.#playerService = globalContext.playerService();
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

                    case Action.joinGame:
                        await this.#playerService.joinGame(sessionContext, action.player.name);
                        break;

                    case Action.leaveGame:
                        await this.#playerService.leaveGame(sessionContext);
                        break;

                    case Action.skipTurn:
                        await this.#gameService.skipTurn(sessionContext);
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