import { Context } from './context.js';

/**
 * This is not a data structure that represents a game! Rather, it is a
 * container class for game-related things.
 */

export class Game {

    /**
     * Defines the game attributes used in conjunction with the session
     * storage.
     */

    static get Attribute() {
        return Object.freeze({
            id: 'gameId'
        });
    }

    /**
     * Defines the game objectives.
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

/**
 * Manages the game ID in the session storage.
 */

export class GameHelper {
    #random;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the context.
     *
     * @param {Context} context holds the globally-scoped objects
     */

    constructor(context) {
        this.#random = context.random();
    }

    /**
     * Loads the game ID from the session storage.
     * <p>
     * If the session storage does not contain a game ID, a new game ID is
     * generated and stored.
     *
     * @returns {string} the game ID
     */

    loadId() {
        let id = window.sessionStorage.getItem(Game.Attribute.id);

        if (!id) {
            this.saveId(id = this.#random.generateId());
        }

        return id;
    }

    /**
     * Rempves the game ID from the session storage.
     */

    removeId() {
        window.sessionStorage.removeItem(Game.Attribute.id);
    }

    /**
     * Saves the game ID in the sesssion storage.
     *
     * @param {string} id the game ID
     */

    saveId(id) {
        window.sessionStorage.setItem(Game.Attribute.id, id);
    }
}
