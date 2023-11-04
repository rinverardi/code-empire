import { Player } from '../player/player.mjs';

export class GameAccess {
    getCurrentPlayer(game) {
        const playerId = game.turn.player;

        for (const player of game.players) {
            if (player.id === playerId) {
                return player;
            }
        }
    }

    getNextPlayer(game) {
        const playerId = game.turn.player;

        const activePlayers = game.players.filter(that => that.status === Player.Status.alive);

        for (let index = 0; index < activePlayers.length - 1; index++) {
            if (activePlayers[index].id === playerId) {
                return activePlayers[index + 1];
            }
        }

        return activePlayers[0];
    }
};