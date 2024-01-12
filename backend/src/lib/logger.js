/**
 * Providers helper functions for working with logs.
 */

export class Logger {

    /**
     * Logs an error with severity 'error'.
     *
     * @param {string} where the location of the error
     * @param {Error} what the error itself
     */

    static e(where, what) {
        console.error(`E ${where}: ${what}`);
    }

    /**
     * Logs an error with severity 'warning'.
     *
     * @param {string} where the location of the error
     * @param {Error} what the error itself
     */

    static w(where, what) {
        console.warn(`W ${where}: ${what}`);
    }
}
