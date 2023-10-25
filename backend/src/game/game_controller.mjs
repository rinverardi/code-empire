import { Game } from "./game.mjs";

export class GameController {
    #gameService;

    constructor(globalContext) {
        this.#gameService = globalContext.gameService();
    }

    async watchGame(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        wsConnection.on('message', wsMessageJson => {
            const wsMessage = JSON.parse(wsMessageJson);

            if (wsMessage.action.id === Game.Action.createGame) {
                this.#gameService.createGame(sessionContext, wsMessage.map.id, wsMessage.player.name);
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