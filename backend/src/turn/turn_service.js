import { Game } from '../game/game.js';

export class TurnService {
    #gameRepository;
    #resourceManager;
    #turnManager;

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
        this.#resourceManager = globalContext.resourceManager();
        this.#turnManager = globalContext.turnManager();
    }

    async #endTurn(sessionContext, game) {
        this.#resourceManager.endTurn(game);
        this.#turnManager.endTurn(game);

        this.#resourceManager.startTurn(game);
        this.#turnManager.startTurn(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async executeTurn(sessionContext, turn) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#turnManager.executeTurn(game, turn);

        await this.#endTurn(sessionContext, game);
    }

    async skipTurn(sessionContext) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        await this.#endTurn(sessionContext, game);
    }
};
