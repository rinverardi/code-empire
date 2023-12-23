export class Game {
    static get Attribute() {
        return Object.freeze({
            id: 'gameId'
        });
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

export class GameHelper {
    #random;

    constructor(context) {
        this.#random = context.random();
    }

    loadId() {
        let id = window.sessionStorage.getItem(Game.Attribute.id);

        if (!id) {
            this.saveId(id = this.#random.generateId());
        }

        return id;
    }

    removeId() {
        window.sessionStorage.removeItem(Game.Attribute.id);
    }

    saveId(id) {
        window.sessionStorage.setItem(Game.Attribute.id, id);
    }
}
