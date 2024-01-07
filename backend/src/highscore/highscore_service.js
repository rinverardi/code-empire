export class HighscoreService {
    #gameRepository;
    #highscoreRepository;

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
        this.#highscoreRepository = globalContext.highscoreRepository();
    }

    async submit(sessionContext, winner) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = game.players.find(that => that.id === winner.player);

        var highscores = await this.#highscoreRepository.loadHighscores(sessionContext) ?? [];

        highscores.push({
            name: player.name,
            score: winner.scoreGold
        });

        highscores = highscores.sort((a, b) => b.score - a.score);

        for (let index = 0; index < highscores.length; index++) {
            if (index === 0) {
                highscores[index].position = 1;
            } else if (highscores[index].score < highscores[index - 1].score) {
                highscores[index].position = index + 1;
            }
        }

        await this.#highscoreRepository.saveHighscores(sessionContext, highscores);
    }
};
