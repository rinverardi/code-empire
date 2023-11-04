import { createClient } from 'redis';

import { Logger } from './logger.mjs';

export class SessionContext {
    #redisClient;
    #redisConnection;
    #wsConnection;
    #wsParams;

    constructor(wsConnection, wsParams) {
        this.#redisClient = createClient();

        this.#redisClient.on('error', error => Logger.e('redis', error));

        this.#wsConnection = wsConnection;
        this.#wsParams = wsParams;
    }

    get gameId() {
        return this.#wsParams ? this.#wsParams[0] : null;
    }

    get playerId() {
        return this.#wsParams ? this.#wsParams[1] : null;
    }

    get playerSecret() {
        return this.#wsParams ? this.#wsParams[2] : null;
    }

    async redisConnection(share) {
        if (share) {
            return this.#redisConnection ? this.#redisConnection : this.#redisConnection = this.redisConnection(false);
        } else {
            const redisClient = this.#redisClient.duplicate();
            const redisConnection = await redisClient.connect();

            this.#wsConnection.on('close', () => redisConnection.disconnect());

            return redisConnection;
        }
    }

    wsConnection() {
        return this.#wsConnection;
    }
}