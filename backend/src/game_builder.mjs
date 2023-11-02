import { Game } from './game.mjs';
import { Player } from './player.mjs';

export class GameBuilder {
    #playerBuilder;

    constructor(globalContext) {
        this.#playerBuilder = globalContext.playerBuilder();
    }

    buildGame(sessionContext, mapId, playerName) {
        const player = this.#playerBuilder.buildPlayer(sessionContext, playerName, Player.Role.master);

        return {
            id: sessionContext.gameId,
            map: {
                id: mapId
            },
            players: [player],
            status: Game.Status.waiting
        };
    }
};