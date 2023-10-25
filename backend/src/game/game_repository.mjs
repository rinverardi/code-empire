import { Game } from './game.mjs';

export class GameRepository {
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
};