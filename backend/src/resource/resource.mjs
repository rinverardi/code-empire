export class Resource {
    static get Type() {
        return Object.freeze({
            food: 'food',
            gold: 'gold',
            research: 'research',
            weaponry: 'weaponry'
        })
    }
};