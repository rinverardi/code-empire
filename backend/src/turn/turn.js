/**
 * This is not a data structure that represents a turn! Rather, it is a
 * container class for turn-related things.
 */

export class Turn {

    /**
     * Defines the turn directions.
     */

    static get Direction() {
        return Object.freeze({
            east: { x: 2, y: 0 },
            northEast: { x: 1, y: -1 },
            northWest: { x: -1, y: -1 },
            southEast: { x: 1, y: 1 },
            southWest: { x: -1, y: 1},
            west: { x: -2, y: 0 }
        })
    }

    /**
     * Defines the turn types.
     * <p>
     * These constants are also defined in the frontend code. If you change any
     * of them, ensure that you apply the same modifications in both places.
     */

    static get Type() {
        return Object.freeze({
            attack: 'attack',
            build: 'build',
            move: 'move'
        });
    }
};
