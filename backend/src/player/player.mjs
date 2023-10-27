export class Player {
    static get Role() {
        return Object.freeze({
            master: 'master',
            participant: 'participant'
        });
    }

    static get Status() {
        return Object.freeze({
            alive: 'alive',
            left: 'left'
        });
    }
};