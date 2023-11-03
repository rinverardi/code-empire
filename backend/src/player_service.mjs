import { Game } from './game.mjs';
import { Player } from './player.mjs';

export class PlayerService {
    #gameRepository;
    #playerManager;

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
        this.#playerManager = globalContext.playerManager();
    }

    async joinGame(sessionContext, playerName) {

        // TODO Check the limit!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        game.players = game.players.filter(that => that.id !== sessionContext.playerId);

        const player = this.#playerManager.buildPlayer(sessionContext, playerName, Player.Role.participant);

        game.players.push(player);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async leaveGame(sessionContext) {

        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        game.players = game.players.filter(that => that.id !== sessionContext.playerId);

        game.players.push({
            id: sessionContext.playerId,
            status: Player.Status.left
        });

        if (game.players.every(that => that.status === Player.Status.left)) {
            game.status = Game.Status.aborted;
        }

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }
};