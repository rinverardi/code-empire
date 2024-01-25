/**
 * This is not a data structure that represents a game! Rather, it is a
 * container class for game-related things.
 */

export class Game {

    /**
     * Defines the game-related database keys.
     */

    static get Key() {
        return Object.freeze({
            game: 'game',
            games: 'games'
        })
    }

    /**
     * Defines the game objectives.
     * <p>
     * These constants are also defined in the frontend code. If you change any
     * of them, ensure that you apply the same modifications in both places.
     */

    static get Objective() {
        return Object.freeze({
            haveGold: 'haveGold',
            haveMetropolises: 'haveMetropolises',
            survive: 'survive'
        });
    }

    /**
     * Defines the game statuses.
     * <p>
     * These constants are also defined in the frontend code. If you change any
     * of them, ensure that you apply the same modifications in both places.
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
