/**
 * This is not a data structure that represents a game! Rather, it is a
 * container class for game-related things.
 */

export class Game {

    /**
     * Constants for constructing the database keys for games.
     */

    static get Key() {
        return Object.freeze({
            game: 'game',
            games: 'games'
        })
    }

    /**
     * The game objectives that are supported.
     */

    static get Objective() {
        return Object.freeze({
            haveGold: 'haveGold',
            haveMetropolises: 'haveMetropolises',
            survive: 'survive'
        });
    }

    /**
     * The game statuses that are supported.
     */

    static get Status() {
        return Object.freeze({
            aborted: 'aborted',
            ended: 'ended',
            missing: 'missing',
            running: 'running',
            waiting: 'waiting'
        });
    }
};
