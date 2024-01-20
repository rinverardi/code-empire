/**
 * This is not a data structure that represents a player! Rather, it is a
 * container class for player-related things.
 */

export class Player {

    /**
     * Defines the player roles.
     */

    static get Role() {
        return Object.freeze({
            master: 'master',
            participant: 'participant'
        });
    }

    /**
     * Defines the player statuses.
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
