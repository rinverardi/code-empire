import { Game } from "./game.mjs";
import { Logger } from "../lib/logger.mjs";
import { Player } from "../player/player.mjs";

export class GameService {
    #gameMapper;
    #gameRepository;

    constructor(globalContext) {
        this.#gameMapper = globalContext.gameMapper();
        this.#gameRepository = globalContext.gameRepository();
    }

    async createGame(sessionContext, mapId, playerName) {
        const game = {
            game: {
                id: sessionContext.gameId,
                status: Game.Status.waiting
            },
            map: {
                id: mapId
            },
            players: [{
                id: sessionContext.playerId,
                name: playerName,
                role: Player.Role.master,
                status: Player.Status.alive,
                secret: sessionContext.playerSecret
            }]
        };

        await this.#gameRepository.createGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext);
    }

    async loadGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);

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
        await this.#gameRepository.subscribeGame(sessionContext, async () => {
            try {
                onUpdate(await this.loadGame(sessionContext));
            } catch (exception) {
                Logger.exception('GameService.watchGame', exception);
            }
        });

        onUpdate(await this.loadGame(sessionContext));
    }

    async watchGameList(sessionContext, onUpdate) {
        await this.#gameRepository.subscribeGameList(sessionContext, async () => {
            try {
                onUpdate(await this.loadGameList(sessionContext));
            } catch (exception) {
                Logger.exception('GameService.watchGameList', exception);
            }
        });

        onUpdate(await this.loadGameList(sessionContext));
    }
};