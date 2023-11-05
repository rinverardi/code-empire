export class TurnHelper {
    getPlayer(game) {
        const playerId = game.turn.player;

        for (const player of game.players) {
            if (player.id === playerId) {
                return player;
            }
        }
    }

    getTurn(game, x, y) {
        for (const turn of game.turns || []) {
            if (turn.positionTo[0] === x && turn.positionTo[1] === y) {
                return turn;
            }
        }
    }
}