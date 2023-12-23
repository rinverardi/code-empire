import { Game } from './game.js';

export class GameRepository {
    async loadGame(sessionContext) {
        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        return JSON.parse(await redisConnection.get(redisKey));
    }

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

    async publishGame(sessionContext, game) {
        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        redisConnection.publish(redisKey, this.#stringify(game));
    }

    async saveGame(sessionContext, game) {
        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        await redisConnection.set(redisKey, this.#stringify(game));
    }

    #stringify(value) {
        return JSON.stringify(value, null, 4);
    }

    async subscribeGame(sessionContext, handler) {
        const redisConnection = await sessionContext.redisConnection(false);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        redisConnection.subscribe(redisKey, handler);
    }

    async subscribeGameList(sessionContext, handler) {
        const redisConnection = await sessionContext.redisConnection(false);
        const redisKey = `${Game.Key.game}:*`;

        redisConnection.pSubscribe(redisKey, handler);
    }
};
