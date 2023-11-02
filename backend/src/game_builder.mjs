import { Game } from './game.mjs';
import { Player } from './player.mjs';

export class GameBuilder {
    buildGame(sessionContext, mapId, playerName) {
        return {
            id: sessionContext.gameId,
            map: {
                id: mapId
            },
            players: [{
                id: sessionContext.playerId,
                name: playerName,
                role: Player.Role.master,
                status: Player.Status.alive,
                secret: sessionContext.playerSecret
            }],
            status: Game.Status.waiting
        };
    }
};