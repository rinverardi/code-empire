export class TurnService {
    #authn;
    #authz;
    #gameRepository;
    #resourceManager;
    #turnManager;
    #visibilityManager;

    constructor(globalContext) {
        this.#authn = globalContext.authn();
        this.#authz = globalContext.authz();
        this.#gameRepository = globalContext.gameRepository();
        this.#resourceManager = globalContext.resourceManager();
        this.#turnManager = globalContext.turnManager();
        this.#visibilityManager = globalContext.visibilityManager();
    }

    async #endTurn(sessionContext, game) {
        this.#resourceManager.endTurn(game);
        this.#visibilityManager.endTurn(game);
        this.#turnManager.endTurn(game);

        this.#resourceManager.startTurn(game);
        this.#turnManager.startTurn(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async executeTurn(sessionContext, turn) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canExecuteTurn(game, player).orThrow();

        this.#turnManager.executeTurn(game, turn);

        await this.#endTurn(sessionContext, game);
    }

    async skipTurn(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canSkipTurn(game, player).orThrow();

        await this.#endTurn(sessionContext, game);
    }
};
