export class TurnHelper {
    getPlayer(game) {
        const playerId = game.turn.player;

        for (const player of game.players) {
            if (player.id === playerId) {
                return player;
            }
        }
    }
}