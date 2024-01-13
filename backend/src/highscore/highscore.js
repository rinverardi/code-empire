/**
 * This is not a data structure that represents the highscores! Rather, it is a
 * container class for highscore-related things.
 */

export class Highscore {

    /**
     * The database key for the highscores.
     */

    static get key() {
        return 'highscores';
    }
};
