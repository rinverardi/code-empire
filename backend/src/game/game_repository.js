import { Game } from './game.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Provides methods for loading, saving, publishing and subscribing to games in
 * a Redis database.
 */

export class GameRepository {

    /**
     * Loads the current game from the database.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @returns {Object} the game state
     */

    async loadGame(sessionContext) {
        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        return JSON.parse(await redisConnection.get(redisKey));
    }

    /**
     * Loads all games from the database.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @returns {Array} the game states
     */

    async loadGameList(sessionContext) {
        const games = [];

        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:*`;

        for await (const key of redisConnection.scanIterator({ MATCH: redisKey })) {
            const game = JSON.parse(await redisConnection.get(key));

            games.push(game);
        }

        return games;
    }

    /**
     * Publishes a game state.
     * <p>
     * This method is called by the producer in a publish/subscribe scenario.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {object} game the game state
     */

    async publishGame(sessionContext, game) {
        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        redisConnection.publish(redisKey, this.#stringify(game));
    }

    /**
     * Saves a game in the Redis database.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @returns {Object} the game state
     */

    async saveGame(sessionContext, game) {
        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        await redisConnection.set(redisKey, this.#stringify(game));
    }

    #stringify(value) {
        return JSON.stringify(value, null, 4);
    }

    /**
     * Installs a callback that is invoked whenever the state of the current
     * game changes.
     * <p>
     * This method is called by the consumer in a publish/subscribe scenario.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {function} handler called for every change
     */

    async subscribeGame(sessionContext, handler) {
        const redisConnection = await sessionContext.redisConnection(false);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        await redisConnection.subscribe(redisKey, handler);
    }

    /**
     * Installs a callback that is invoked whenever the state of any game
     * changes.
     * <p>
     * This method is called by the consumer in a publish/subscribe scenario.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {function} handler called for every change
     */

    async subscribeGameList(sessionContext, handler) {
        const redisConnection = await sessionContext.redisConnection(false);
        const redisKey = `${Game.Key.game}:*`;

        await redisConnection.pSubscribe(redisKey, handler);
    }
};
