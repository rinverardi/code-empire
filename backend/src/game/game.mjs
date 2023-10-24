export class Game {
    #id;
    #players = {};

    constructor(id) {
        this.#id = id;
    }

    static get Key() {
        return Object.freeze({
            all: "game:*"
        })
    }

    static get Status() {
        return Object.freeze({
            waiting: 'waiting'
        });
    }
};