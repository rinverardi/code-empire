import { Highscore } from './highscore.js';

export class HighscoreRepository {
    async loadHighscores(sessionContext) {
        const redisConnection = await sessionContext.redisConnection(true);

        return JSON.parse(await redisConnection.get(Highscore.key));
    }

    async publishHighscores(sessionContext, highscores) {
        const redisConnection = await sessionContext.redisConnection(true);

        redisConnection.publish(Highscore.key, this.#stringify(highscores));
    }

    async saveHighscores(sessionContext, highscores) {
        const redisConnection = await sessionContext.redisConnection(true);

        await redisConnection.set(Highscore.key, this.#stringify(highscores));
    }

    #stringify(value) {
        return JSON.stringify(value, null, 4);
    }

    async subscribeHighscores(sessionContext, handler) {
        const redisConnection = await sessionContext.redisConnection(false);

        await redisConnection.subscribe(Highscore.key, handler);
    }
};
