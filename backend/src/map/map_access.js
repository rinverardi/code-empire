import { Map } from './map.js';
import { Player } from '../player/player.js';

/**
 * Provides helper methods for accessing specific elements of a map (e.g.,
 * getting the map dimensions, retrieving a player given its position,
 * retrieving a resource given its position, retrieving a structure given its
 * position).
 */

export class MapAccess {

    /**
     * Retrieves a player given its position on the map.
     *
     * @param {object} game the game state
     * @param {number} x the x-coordinate of the position
     * @param {number} y the y-coordinate of the position
     * @returns {object} the player
     */

    getPlayerAt(game, x, y) {
        for (const player of game.players) {
            if (player.status === Player.Status.alive) {
                const position = player.position;

                if (position && position[0] === x && position[1] === y) {
                    return player;
                }
            }
        }
    }

    /**
     * Retrieves a resource given its position on the map.
     *
     * @param {object} game the game state
     * @param {number} x the x-coordinate of the position
     * @param {number} y the y-coordinate of the position
     * @returns {object} the resource
     */

    getResourceAt(game, x, y) {
        for (const resource of game.resources) {
            const position = resource.position;

            if (position[0] === x && position[1] === y) {
                return resource;
            }
        }
    }

    /**
     * Returns the horizontal size of the map.
     *
     * @param {object} game the game state
     * @returns {number} the horizontal size
     */

    getSizeX(game) {
        return game.map.tiles[0].length / 2;
    }

    /**
     * Returns the vertical size of the map.
     *
     * @param {object} game the game state
     * @returns {number} the vertical size
     */

    getSizeY(game) {
        return game.map.tiles.length;
    }

    /**
     * Retrieves a structure given its position on the map.
     *
     * @param {object} game the game state
     * @param {number} x the x-coordinate of the position
     * @param {number} y the y-coordinate of the position
     * @returns {object} the structure
     */

    getStructureAt(game, x, y) {
        for (const structure of game.structures) {
            const position = structure.position;

            if (position[0] === x && position[1] === y) {
                return structure;
            }
        }
    }

    /**
     * Retrieves a tile given its position on the map.
     *
     * @param {object} game the game state
     * @param {number} x the x-coordinate of the position
     * @param {number} y the y-coordinate of the position
     * @returns {object} the tile
     */

    getTileAt(game, x, y) {
        const tile = game.map.tiles[y][x];

        if (Object.values(Map.Tile).includes(tile)) {
            return tile;
        } else {
            throw new RangeError('No such tile');
        }
    }

    /**
     * Picks a random position on the map.
     * <p>
     * The position is returned as an array containing the x-coordinate and the
     * y-coordinate.
     *
     * @param {object} game the game state
     * @returns {Array} the position
     */

    pickPosition(game) {
        const x = Math.floor(Math.random() * this.getSizeX(game));
        const y = Math.floor(Math.random() * this.getSizeY(game));

        return [x * 2 + y % 2, y];
    }
};
