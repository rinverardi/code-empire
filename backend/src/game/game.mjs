export class Game {
    #id;
    #players = {};

    constructor(id) {
        this.#id = id;
    }

    static get Action() {
        return Object.freeze({
            abortGame: 'abortGame',
            createGame: 'createGame',
            joinGame: 'joinGame',
            leaveGame: 'leaveGame',
            startGame: 'startGame'
        });
    }

    static get Key() {
        return Object.freeze({
            game: 'game',
            games: 'games'
        })
    }

    static get Status() {
        return Object.freeze({
            aborted: 'aborted',
            missing: 'missing',
            thinking: 'thinking',
            waiting: 'waiting'
        });
    }
};