import { Game } from "./game.mjs";

export class GameService {
    #gameMapper;
    #gameRepository;

    constructor(globalContext) {
        this.#gameMapper = globalContext.gameMapper();
        this.#gameRepository = globalContext.gameRepository();
    }

    async loadGame(sessionContext, gameId) {
        const game = await this.#gameRepository.loadGame(sessionContext, gameId);

        return game != null
            ? this.#gameMapper.map(sessionContext, game)
            : { game: { status: 'missing' } };
    }

    async loadGameList(sessionContext) {
        const gameList = await this.#gameRepository.loadGameList(sessionContext);

        return gameList
            .filter(that => that.game.status === Game.Status.waiting)
            .map(that => this.#gameMapper.map(sessionContext, that));
    }

    async watchGame(sessionContext, onUpdate) {
        const redisConnection = await sessionContext.dedicatedRedisConnection();

        redisConnection.subscribe(`game:${sessionContext.gameId}`, async () => {
            onUpdate(await this.loadGame(sessionContext));
        });

        onUpdate(await this.loadGame(sessionContext));
    }

    async watchGameList(sessionContext, onUpdate) {
        const redisConnection = await sessionContext.dedicatedRedisConnection();

        redisConnection.subscribe('games', async () => {
            onUpdate(await this.loadGameList(sessionContext));
        });

        onUpdate(await this.loadGameList(sessionContext));
    }
};