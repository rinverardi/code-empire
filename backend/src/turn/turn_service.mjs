export class TurnService {
    #gameRepository;
    #turnManager;

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
        this.#turnManager = globalContext.turnManager();
    }

    async skipTurn(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#turnManager.endTurn(game);
        this.#turnManager.startTurn(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }
};