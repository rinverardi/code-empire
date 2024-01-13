import { Highscore } from './highscore.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Provides methods for loading, saving, publishing and subscribing to
 * highscores in a Redis database.
 */

export class HighscoreRepository {

    /**
     * Loads the highscores from the database.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @returns {object} the highscores
     */

    async loadHighscores(sessionContext) {
        const redisConnection = await sessionContext.redisConnection(true);

        return JSON.parse(await redisConnection.get(Highscore.key));
    }

    /**
     * Publishes the highscores.
     * <p>
     * This method is called by the producer in a publish/subscribe scenario.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} highscores the highscores
     */

    async publishHighscores(sessionContext, highscores) {
        const redisConnection = await sessionContext.redisConnection(true);

        redisConnection.publish(Highscore.key, this.#stringify(highscores));
    }

    /**
     * Saves a game in the Redis database.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @returns {object} the game
     */

    async saveHighscores(sessionContext, highscores) {
        const redisConnection = await sessionContext.redisConnection(true);

        await redisConnection.set(Highscore.key, this.#stringify(highscores));
    }

    #stringify(value) {
        return JSON.stringify(value, null, 4);
    }

    /**
     * Installs a callback that is invoked whenever the highscores change.
     * <p>
     * This method is called by the consumer in a publish/subscribe scenario.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {function} handler called for every change
     */

    async subscribeHighscores(sessionContext, handler) {
        const redisConnection = await sessionContext.redisConnection(false);

        await redisConnection.subscribe(Highscore.key, handler);
    }
};
