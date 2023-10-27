export class Game {
    #id;
    #players = {};

    constructor(id) {
        this.#id = id;
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