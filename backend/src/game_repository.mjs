import { Game } from './game.mjs';

export class GameRepository {
    async loadGame(sessionContext) {
        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        return await redisConnection.json.get(redisKey);
    }

    async loadGameList(sessionContext) {
        const games = [];

        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:*`;

        for await (const key of redisConnection.scanIterator({ MATCH: redisKey })) {
            games.push(await redisConnection.json.get(key));
        }

        return games;
    }

    async publishGame(sessionContext, game) {
        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        redisConnection.publish(redisKey, JSON.stringify(game));
    }

    async saveGame(sessionContext, game) {

        // TODO Lock me!

        const redisConnection = await sessionContext.redisConnection(true);
        const redisKey = `${Game.Key.game}:${sessionContext.gameId}`;

        await redisConnection.json.set(redisKey, '.', game);
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