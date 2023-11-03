import { Map } from './map.mjs';

export class MapAccess {
    getPlayerAt(game, x, y) {
        const positions = game.players.map(that => that.position);

        return positions.some(that => that && that[0] === x && that[1] === y);
    }

    getSizeX(game) {
        return game.map.tiles[0].length / 2;
    }

    getSizeY(game) {
        return game.map.tiles.length;
    }

    getTileAt(game, x, y) {
        const tile = game.map.tiles[y][x];

        switch (tile) {
            case Map.Tile.forest:
            case Map.Tile.grass:
            case Map.Tile.hill:
            case Map.Tile.mountain:
            case Map.Tile.water:
                return tile;

            default:
                throw new RangeError('No such tile');
        }
    }

    pickPosition(game) {
        const x = Math.floor(Math.random() * this.getSizeX(game));
        const y = Math.floor(Math.random() * this.getSizeY(game));

        return [x * 2 + y % 2, y];
    }
};