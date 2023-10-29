export class Inventory {
    static get Item() {
        return Object.freeze({
            food: 'food',
            gold: 'gold',
            science: 'science',
            weapon: 'weapon'
        });
    }
};