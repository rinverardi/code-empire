export class Game {
    #id;
    #players = {};

    constructor(id) {
        this.#id = id;
    }

    static get Action() {
        return Object.freeze({
            createGame: 'createGame',
            joinGame: 'joinGame',
            leaveGame: 'leaveGame',
            startGame: 'startGame'
        });
    }

    static get Key() {
        return Object.freeze({
            all: 'game:*'
        })
    }

    static get Status() {
        return Object.freeze({
            waiting: 'waiting'
        });
    }
};