export class Notification {
    static get Type() {
        return Object.freeze({
            attack: 'attack',
            kill: 'kill'
        });
    }
};
