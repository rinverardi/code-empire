import { createClient } from 'redis';

import { GlobalConfig } from './global_config.js';
import { Logger } from './logger.js';

/**
 * Holds the session-scoped objects and provides helper methods (e.g., enable
 * communication via Redis, enable communication via WebSockets) as well as
 * helper properties (e.g., current game ID, current player ID, current player
 * secret).
 * <p>
 * When writing test cases, you can override the methods of this class to
 * inject mock objects.
 */

export class SessionContext {
    #redisClient;
    #redisConnection;
    #wsConnection;
    #wsParams;

    /**
     * Constructs a session context.
     *
     * @param {object} wsConnection the connection from the frontend
     * @param {Array} wsParams the parameters from the frontend
     */

    constructor(wsConnection, wsParams) {
        this.#redisClient = createClient({ url: GlobalConfig.redis.url });

        this.#redisClient.on('error', error => Logger.e('redis', error));

        this.#wsConnection = wsConnection;
        this.#wsParams = wsParams;
    }

    /**
     * A string that uniquely identifies the current game.
     */

    get gameId() {
        return this.#wsParams ? this.#wsParams[0] : null;
    }

    /**
     * A string that uniquely identifies the current player.
     */

    get playerId() {
        return this.#wsParams ? this.#wsParams[1] : null;
    }

    /**
     * A string that authenticates the current player.
     */

    get playerSecret() {
        return this.#wsParams ? this.#wsParams[2] : null;
    }

    /**
     * Create or reuse a Redis connection.
     * <p>
     * The Redis connection is tied to the lifecycle of the current WebSockets
     * connection. Closing the WebSockets connection gracefully terminates the
     * Redis connection.
     *
     * @param {boolean} share whether or not to reuse the Redis connection
     * @returns {Promise} the Redis connection
     */

    async redisConnection(share) {
        if (share) {
            return this.#redisConnection ? this.#redisConnection : this.#redisConnection = this.redisConnection(false);
        } else {
            const redisClient = this.#redisClient.duplicate();
            const redisConnection = await redisClient.connect();

            this.#wsConnection.on('close', () => redisConnection.quit());

            return redisConnection;
        }
    }

    /**
     * Returns the current WebSockets connection.
     *
     * @returns the WebSockets connection
     */

    wsConnection() {
        return this.#wsConnection;
    }
}
