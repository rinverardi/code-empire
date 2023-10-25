export class GameController {
    #gameService;

    constructor(globalContext) {
        this.#gameService = globalContext.gameService();
    }

    watchGame(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        this.#gameService.watchGame(sessionContext, (game) => {
            wsConnection.send(JSON.stringify(game));
        });
    }

    watchGameList(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        this.#gameService.watchGameList(sessionContext, (gameList) => {
            wsConnection.send(JSON.stringify(gameList));
        });
    }
};