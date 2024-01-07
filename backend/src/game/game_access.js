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
        const currentIndex = game.players.findIndex(that => that.id === game.turn.player);

        for (var nextIndex = currentIndex + 1; nextIndex !== currentIndex; nextIndex++) {
            if (nextIndex >= game.players.length) {
                nextIndex = 0;
            }

            const player = game.players[nextIndex];

            if (player.status === Player.Status.alive) {
                return player;
            }
        }
    }

    getVisibility(sessionContext, game) {
        for (const player of game.players) {
            if (player.id === sessionContext.playerId) {
                return player.visibility;
            }
        }
    }
};
