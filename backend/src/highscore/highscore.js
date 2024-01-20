/**
 * This is not a data structure that represents the highscores! Rather, it is a
 * container class for highscore-related things.
 */

export class Highscore {

    /**
     * Defines the highscore-related database keys.
     */

    static get key() {
        return 'highscores';
    }
};
