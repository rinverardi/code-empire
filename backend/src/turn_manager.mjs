export class TurnManager {
    startGame(game) {
        game.turn = {
            number: 1,
            player: game.players[0].id
        }
    }
};