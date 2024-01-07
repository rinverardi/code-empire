export class TurnService {
    #authn;
    #authz;
    #gameManager;
    #gameRepository;
    #highscoreService;
    #playerManager;
    #resourceManager;
    #structureManager;
    #turnManager;
    #visibilityManager;

    constructor(globalContext) {
        this.#authn = globalContext.authn();
        this.#authz = globalContext.authz();
        this.#gameManager = globalContext.gameManager();
        this.#gameRepository = globalContext.gameRepository();
        this.#highscoreService = globalContext.highscoreService();
        this.#playerManager = globalContext.playerManager();
        this.#resourceManager = globalContext.resourceManager();
        this.#structureManager = globalContext.structureManager();
        this.#turnManager = globalContext.turnManager();
        this.#visibilityManager = globalContext.visibilityManager();
    }

    #endTurn(game) {
        this.#playerManager.endTurn(game);
        this.#visibilityManager.endTurn(game);
        this.#turnManager.endTurn(game);

        this.#structureManager.startTurn(game);
        this.#resourceManager.startTurn(game);
        this.#turnManager.startTurn(game);
    }

    async executeTurn(sessionContext, turn) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canExecuteTurn(game, player).orThrow();

        this.#startTurn(game);

        if (turn) {
            this.#turnManager.executeTurn(game, turn);
        }

        this.#endTurn(game);

        const winner = this.#gameManager.determineWinner(game);

        if (winner) {
            this.#gameManager.endGame(game, winner);
            this.#highscoreService.submitScore(sessionContext, winner);
        }

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async skipTurn(sessionContext) {
        this.executeTurn(sessionContext, null);
    }

    // TODO Implement me!

    #startTurn(game) { }
};
