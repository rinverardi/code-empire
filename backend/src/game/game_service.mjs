export class GameService {
    #gameMapper;
    #gameRepository;

    constructor(context) {
        this.#gameMapper = context.gameMapper;
        this.#gameRepository = context.gameRepository;
    }

    async listGamesByStatus(gameStatus) {
        const games = await this.#gameRepository.listGames();

        return games
            .filter((game) => game.status === gameStatus)
            .map(this.#gameMapper.mapForAnyone);
    }

    async loadGame(gameId) {
        let game = await this.#gameRepository.loadGame(gameId);

        if (game == null) {
            game = {
                "game": { "status": "missing" }
            };
        }

        return this.#gameMapper.mapForAnyone(game);
    }
};