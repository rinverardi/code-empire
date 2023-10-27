import { Game } from './game.mjs';
import { Logger } from '../lib/logger.mjs';

export class GameController {
    #gameService;

    constructor(globalContext) {
        this.#gameService = globalContext.gameService();
    }

    async watchGame(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        wsConnection.on('message', async wsMessage => {
            try {
                const actionMessage = JSON.parse(wsMessage);

                switch (actionMessage.action.id) {
                    case Game.Action.abortGame:
                        await this.#gameService.abortGame(sessionContext);
                        break;
                        
                    case Game.Action.createGame:
                        await this.#gameService.createGame(sessionContext, actionMessage.map.id, actionMessage.player.name);
                        break;

                    case Game.Action.startGame:
                        await this.#gameService.startGame(sessionContext);
                        break;
                }
            } catch (exception) {
                Logger.exception('GameController.watchGame', exception);
            }
        });

        await this.#gameService.watchGame(sessionContext, (game) => {
            wsConnection.send(JSON.stringify(game));
        });
    }

    async watchGameList(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        await this.#gameService.watchGameList(sessionContext, (gameList) => {
            wsConnection.send(JSON.stringify(gameList));
        });
    }
};