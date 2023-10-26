import { Game } from './game.mjs';
import { Logger } from '../lib/logger.mjs';
import { Player } from '../player/player.mjs';

export class GameService {
    #gameMapper;
    #gameRepository;

    constructor(globalContext) {
        this.#gameMapper = globalContext.gameMapper();
        this.#gameRepository = globalContext.gameRepository();
    }

    async abortGame(sessionContext) {

        // TODO Check the access!
        // TODO Check the status!
        
        const game = await this.#gameRepository.loadGame(sessionContext);

        game.game.status = Game.Status.aborted;

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async createGame(sessionContext, mapId, playerName) {

        // TODO Check the status!

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

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async loadGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);

        return game != null
            ? this.#gameMapper.map(sessionContext, game)
            : { game: { status: Game.Status.missing } };
    }

    async loadGameList(sessionContext) {
        const gameList = await this.#gameRepository.loadGameList(sessionContext);

        return gameList
            .filter(that => that.game.status === Game.Status.waiting)
            .map(that => this.#gameMapper.map(sessionContext, that));
    }

    async startGame(sessionContext) {

        // TODO Check the access!
        // TODO Check the status!
        
        const game = await this.#gameRepository.loadGame(sessionContext);

        // TODO Populate the map!
        // TODO Populate the messages!
        // TODO Populate the players!
        // TODO Populate the turn!

        game.game.status = Game.Status.thinking;

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async watchGame(sessionContext, onUpdate) {
        await this.#gameRepository.subscribeGame(sessionContext, game => {
            onUpdate(JSON.parse(game));
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