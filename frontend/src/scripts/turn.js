export class TurnHelper {
    getPlayer(message) {
        const playerId = message.turn.player;

        for (const player of message.players) {
            if (player.id === playerId) {
                return player;
            }
        }
    }
}