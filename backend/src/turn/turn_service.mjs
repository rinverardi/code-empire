import { Game } from '../game/game.mjs';

export class TurnService {
    #gameRepository;
    #turnManager;

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
        this.#turnManager = globalContext.turnManager();
    }

    async executeTurn(sessionContext, turn) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#turnManager.executeTurn(game, turn);

        this.#turnManager.endTurn(game);
        this.#turnManager.startTurn(game, turn);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async skipTurn(sessionContext) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#turnManager.endTurn(game);
        this.#turnManager.startTurn(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }
};