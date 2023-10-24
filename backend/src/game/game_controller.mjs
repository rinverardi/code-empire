import { Game } from "./game.mjs";

export class GameController {
    #gameService;

    constructor(context) {
        this.#gameService = context.gameService;
    }

    async haveGame(connection, gameId) {
        const game = await this.#gameService.loadGame(gameId);

        connection.send(JSON.stringify(game));
    }

    async listGames(connection) {
        const games = await this.#gameService.listGamesByStatus(Game.Status.waiting);

        connection.send(JSON.stringify(games));
    }
};