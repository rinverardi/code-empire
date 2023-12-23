import { Game } from '../game/game.js';
import { Player } from './player.js';

export class PlayerService {
    #gameRepository;
    #playerManager;
    #turnManager;

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
        this.#playerManager = globalContext.playerManager();
        this.#turnManager = globalContext.turnManager();
    }

    async forfeitGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);

        game.players = game.players.filter(that => that.id !== sessionContext.playerId);

        game.players.push({
            id: sessionContext.playerId,
            status: Player.Status.forfeited
        });

        if (!game.players.some(that => that.status === Player.Status.alive)) {
            game.status = Game.Status.aborted;
        } else if (game.status === Game.Status.running) {
            this.#turnManager.endTurn(game);
            this.#turnManager.startTurn(game);
        }

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
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

        if (game.players.every(that => that.status !== Player.Status.active)) {
            game.status = Game.Status.aborted;
        } else if (game.status === Game.Status.running) {
            this.#turnManager.endTurn(game);
            this.#turnManager.startTurn(game);
        }

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }
};
