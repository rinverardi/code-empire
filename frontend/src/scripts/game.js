export class Game {
    static get Status() {
        return Object.freeze({
            aborted: 'aborted',
            executing: 'executing',
            missing: 'missing',
            thinking: 'thinking',
            waiting: 'waiting'
        });
    }
};

export class GameHelper {
    findCurrentPlayer(message) {
        const playerId = message.turn.player;

        for (const player of message.players) {
            if (player.id === playerId) {
                return player;
            }
        }
    }
}