export class HighscoreController {
    #highscoreService;

    constructor(globalContext) {
        this.#highscoreService = globalContext.highscoreService();
    }

    async watchHighscores(sessionContext) {
        const wsConnection = sessionContext.wsConnection();

        await this.#highscoreService.watchHighscores(sessionContext, highscores => {
            wsConnection.send(JSON.stringify(highscores));
        });
    }
};
