import { createClient } from 'redis';

import { Logger } from './logger.mjs';

export class SessionContext {
    gameId;
    playerId;
    playerRole;
    playerSecret;

    #redisConnection;
    #wsConnection;

    constructor(wsConnection) {
        this.#wsConnection = wsConnection;
    }

    async dedicatedRedisConnection() {
        const redisClient = createClient();

        redisClient.on('error', error => Logger.error('redis', error));

        const redisConnection = await redisClient.connect();

        this.#wsConnection.on('close', () => redisConnection.disconnect());

        return redisConnection;
    }

    async sharedRedisConnection() {
        return this.#redisConnection != null
            ? this.#redisConnection
            : this.#redisConnection = this.dedicatedRedisConnection();
    }

    wsConnection() {
        return this.#wsConnection;
    }
}