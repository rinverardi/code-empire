/**
 * This is not a data structure that represents a player! Rather, it is a
 * container class for player-related things.
 */

export class Player {

    /**
     * Defines the player roles.
     * <p>
     * These constants are also defined in the frontend code. If you change any
     * of them, ensure that you apply the same modifications in both places.
     */

    static get Role() {
        return Object.freeze({
            master: 'master',
            participant: 'participant'
        });
    }

    /**
     * Defines the player statuses.
     * <p>
     * These constants are also defined in the frontend code. If you change any
     * of them, ensure that you apply the same modifications in both places.
     */

    static get Status() {
        return Object.freeze({
            alive: 'alive',
            dead: 'dead',
            forfeited: 'forfeited',
            left: 'left'
        });
    }
};
