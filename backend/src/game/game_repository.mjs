import { createClient } from 'redis';

import { Game } from './game.mjs';

export class GameRepository {
    async listGames() {
        const games = [];

        const client = await createClient().connect();

        try {
            const keys = client.scanIterator({ MATCH: Game.Key.all });

            for await (const key of keys) {
                games.push(await client.json.get(key));
            }
        } finally {
            client.disconnect();
        }

        return games;
    }

    async loadGame(gameId) {
        const client = await createClient().connect();

        try {
            return await client.json.get(`game:${gameId}`);
        } finally {
            client.disconnect();
        }
    }
};