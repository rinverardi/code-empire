import { createClient } from 'redis';

export class SessionContext {
    gameId;
    playerId;
    playerRole;
    
    #redisConnection;
    #wsConnection;

    constructor(wsConnection) {
        this.#wsConnection = wsConnection;
    }

    async dedicatedRedisConnection() {
        const redisConnection = await createClient().connect();

        this.#wsConnection.on('close', () => redisConnection.disconnect());

        return redisConnection;
    }

    async sharedRedisConnection() {
        if (this.#redisConnection == null) {
            this.#redisConnection = await createClient().connect();

            this.#wsConnection.on('close', () => this.#redisConnection.disconnect());
        }

        return this.#redisConnection;
    }

    wsConnection() {
        return this.#wsConnection;
    }
}