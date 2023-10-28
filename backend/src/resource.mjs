export class Resource {
    static get Type() {
        return Object.freeze({
            food: 'f',
            gold: 'g',
            science: 's',
            weapon: 'w'
        })
    }
};