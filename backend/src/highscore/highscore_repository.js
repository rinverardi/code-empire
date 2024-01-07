import { Highscore } from './highscore.js';

export class HighscoreRepository {
    async loadHighscores(sessionContext) {
        const redisConnection = await sessionContext.redisConnection(true);

        return JSON.parse(await redisConnection.get(Highscore.key));
    }

    async saveHighscores(sessionContext, highscores) {
        const redisConnection = await sessionContext.redisConnection(true);

        await redisConnection.set(Highscore.key, this.#stringify(highscores));
    }

    #stringify(value) {
        return JSON.stringify(value, null, 4);
    }
};
