import { Game } from './game.mjs';

export class GameService {
    #gameManager;
    #gameMapper;
    #gameRepository;

    constructor(globalContext) {
        this.#gameManager = globalContext.gameManager();
        this.#gameMapper = globalContext.gameMapper();
        this.#gameRepository = globalContext.gameRepository();
    }

    async abortGame(sessionContext) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        game.status = Game.Status.aborted;

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async createGame(sessionContext, mapId, playerName) {

        // TODO Check the limit!
        // TODO Check the status!

        const game = this.#gameManager.buildGame(sessionContext, mapId, playerName);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async loadGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);

        return game
            ? this.#gameMapper.map(sessionContext, game)
            : { status: Game.Status.missing };
    }

    async loadGameList(sessionContext) {
        const gameList = await this.#gameRepository.loadGameList(sessionContext);

        return gameList
            .filter(that => that.status === Game.Status.waiting)
            .map(that => this.#gameMapper.map(sessionContext, that));
    }

    async startGame(sessionContext) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#gameManager.startGame(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async watchGame(sessionContext, onUpdate) {
        await this.#gameRepository.subscribeGame(sessionContext, game => {
            const parsedGame = JSON.parse(game);
            const mappedGame = this.#gameMapper.map(sessionContext, parsedGame);

            onUpdate(mappedGame);
        });

        onUpdate(await this.loadGame(sessionContext));
    }

    async watchGameList(sessionContext, onUpdate) {
        await this.#gameRepository.subscribeGameList(sessionContext, async game => {
            const parsedGame = JSON.parse(game);
            const mappedGame = this.#gameMapper.map(sessionContext, parsedGame);

            onUpdate(mappedGame);
        });

        const gameList = await this.loadGameList(sessionContext);

        for (const game of gameList) {
            onUpdate(game);
        }
    }
};