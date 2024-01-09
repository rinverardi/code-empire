import { GlobalConfig } from '../lib/global_config.js';

export class HighscoreService {
    #gameRepository;
    #highscoreRepository;

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
        this.#highscoreRepository = globalContext.highscoreRepository();
    }

    async submitScore(sessionContext, winner) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = game.players.find(that => that.id === winner.player);

        var highscores = await this.#highscoreRepository.loadHighscores(sessionContext) ?? [];

        highscores.push({
            name: player.name,
            score: winner.scoreGold
        });

        highscores = highscores.sort((a, b) => b.score - a.score);

        if (highscores.length > GlobalConfig.highscores.maxEntries) {
            highscores.length = 10;
        }

        for (let index = 0; index < highscores.length; index++) {
            if (index === 0) {
                highscores[index].position = 1;
            } else if (highscores[index].score < highscores[index - 1].score) {
                highscores[index].position = index + 1;
            }
        }

        await this.#highscoreRepository.saveHighscores(sessionContext, highscores);
        await this.#highscoreRepository.publishHighscores(sessionContext, highscores);
    }

    async watchHighscores(sessionContext, onUpdate) {
        await this.#highscoreRepository.subscribeHighscores(sessionContext, highscores => {
            onUpdate(JSON.parse(highscores));
        });

        const highscores = await this.#highscoreRepository.loadHighscores(sessionContext);

        onUpdate(highscores);
    }
};
