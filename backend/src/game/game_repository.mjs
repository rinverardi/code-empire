import { Game } from './game.mjs';

export class GameRepository {
    async createGame(sessionContext, game) {
        const redisConnection = await sessionContext.sharedRedisConnection();

        await redisConnection.json.set(`game:${sessionContext.gameId}`, '.', game);
    }

    async loadGame(sessionContext) {
        const redisConnection = await sessionContext.sharedRedisConnection();

        return await redisConnection.json.get(`game:${sessionContext.gameId}`);
    }

    async loadGameList(sessionContext) {
        const games = [];

        const redisConnection = await sessionContext.sharedRedisConnection();

        for await (const key of redisConnection.scanIterator({ MATCH: Game.Key.all })) {
            games.push(await redisConnection.json.get(key));
        }

        return games;
    }

    async publishGame(sessionContext) {
        const redisConnection = await sessionContext.sharedRedisConnection();

        redisConnection.publish(`game:${sessionContext.gameId}`, '');
    }

    async subscribeGame(sessionContext, handler) {
        const redisConnection = await sessionContext.dedicatedRedisConnection();

        redisConnection.subscribe(`game:${sessionContext.gameId}`, handler);
    }

    async subscribeGameList(sessionContext, handler) {
        const redisConnection = await sessionContext.dedicatedRedisConnection();

        redisConnection.subscribe('games', handler);
    }
};