import { Game } from '../game/game.mjs';

export class TurnService {
    #gameAccess;
    #gameRepository;
    #resourceManager;
    #turnManager;

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
        this.#gameRepository = globalContext.gameRepository();
        this.#resourceManager = globalContext.resourceManager();
        this.#turnManager = globalContext.turnManager();
    }

    async executeTurn(sessionContext, turn) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#turnManager.executeTurn(game, turn);
        this.#turnManager.endTurn(game);

        if (this.#gameAccess.isFirstPlayer(game)) {
            this.#resourceManager.startRound(game);
        }

        this.#turnManager.startTurn(game, turn);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async skipTurn(sessionContext) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#turnManager.endTurn(game);

        if (this.#gameAccess.isFirstPlayer(game)) {
            this.#resourceManager.startRound(game);
        }

        this.#turnManager.startTurn(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }
};