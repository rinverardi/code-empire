export class TurnService {
    #authn;
    #authz;
    #gameRepository;
    #playerManager;
    #resourceManager;
    #structureManager;
    #turnManager;
    #visibilityManager;

    constructor(globalContext) {
        this.#authn = globalContext.authn();
        this.#authz = globalContext.authz();
        this.#gameRepository = globalContext.gameRepository();
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
        this.#turnManager.executeTurn(game, turn);
        this.#endTurn(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async skipTurn(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canSkipTurn(game, player).orThrow();

        this.#startTurn(game);
        this.#endTurn(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    // TODO Implement me!

    #startTurn(game) { }
};
