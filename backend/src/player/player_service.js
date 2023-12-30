import { Game } from '../game/game.js';
import { Player } from './player.js';

export class PlayerService {
    #authn;
    #authz;
    #gameManager;
    #gameRepository;
    #playerManager;
    #turnManager;

    constructor(globalContext) {
        this.#authn = globalContext.authn();
        this.#authz = globalContext.authz();
        this.#gameManager = globalContext.gameManager();
        this.#gameRepository = globalContext.gameRepository();
        this.#playerManager = globalContext.playerManager();
        this.#turnManager = globalContext.turnManager();
    }

    #autoStart(game) {
        const players = game.players.filter(that => that.status === Player.Status.alive);

        // TODO Use a constant!

        if (players.length > 3) {
            this.#gameManager.startGame(game);
            this.#turnManager.startTurn(game);
        }
    }

    async forfeitGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canForfeitGame(game).orThrow();

        game.players = game.players.filter(that => that.id !== player.id);

        game.players.push({
            id: player.id,
            status: Player.Status.forfeited
        });

        const winner = this.#gameManager.determineWinner(game);

        if (winner) {
            this.#gameManager.endGame(game, winner);
        } else {
            this.#turnManager.endTurn(game);
            this.#turnManager.startTurn(game);
        }

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async joinGame(sessionContext, playerName) {
        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#authz.canJoinGame(game).orThrow();

        game.players = game.players.filter(that => that.id !== sessionContext.playerId);

        const player = this.#playerManager.buildPlayer(sessionContext, playerName, Player.Role.participant);

        game.players.push(player);

        this.#autoStart(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async leaveGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canLeaveGame(game).orThrow();

        game.players = game.players.filter(that => that.id !== player.id);

        game.players.push({
            id: player.id,
            status: Player.Status.left
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
};
