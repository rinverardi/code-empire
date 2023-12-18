import { Map } from './map.js';

export class MapAccess {
    getPlayerAt(game, x, y) {
        for (const player of game.players) {
            const position = player.position;

            if (position && position[0] === x && position[1] === y) {
                return player;
            }
        }
    }

    getResourceAt(game, x, y) {
        for (const resource of game.resources) {
            const position = resource.position;

            if (position[0] === x && position[1] === y) {
                return resource;
            }
        }
    }

    getSizeX(game) {
        return game.map.tiles[0].length / 2;
    }

    getSizeY(game) {
        return game.map.tiles.length;
    }

    getStructureAt(game, x, y) {
        for (const structure of game.structures) {
            const position = structure.position;

            if (position[0] === x && position[1] === y) {
                return structure;
            }
        }
    }

    getTileAt(game, x, y) {
        const tile = game.map.tiles[y][x];

        if (Object.values(Map.Tile).includes(tile)) {
            return tile;
        } else {
            throw new RangeError('No such tile');
        }
    }

    pickPosition(game) {
        const x = Math.floor(Math.random() * this.getSizeX(game));
        const y = Math.floor(Math.random() * this.getSizeY(game));

        return [x * 2 + y % 2, y];
    }
};
