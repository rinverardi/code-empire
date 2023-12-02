import { Player } from '../player/player.js';

export class GameAccess {
    getCurrentPlayer(game) {
        for (const player of game.players) {
            if (player.id === game.turn.player) {
                return player;
            }
        }
    }

    getNextPlayer(game) {
        const activePlayers = game.players.filter(that => that.status === Player.Status.alive);

        for (let index = 0; index < activePlayers.length - 1; index++) {
            if (activePlayers[index].id === game.turn.player) {
                return activePlayers[index + 1];
            }
        }

        return activePlayers[0];
    }

    getVisibility(sessionContext, game) {
        for (const player of game.players) {
            if (player.id === sessionContext.playerId) {
                return player.visibility;
            }
        }
    }
};
