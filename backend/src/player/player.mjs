export class Player {
    static get Role() {
        return Object.freeze({
            master: 'master',
            participant: 'participant'
        });
    }
};