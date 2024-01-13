/**
 * This is not a data structure that represents a player! Rather, it is a
 * container class for player-related things.
 */

export class Player {

    /**
     * The player roles that are supported.
     */

    static get Role() {
        return Object.freeze({
            master: 'master',
            participant: 'participant'
        });
    }

    /**
     * The player statuses that are supported.
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
