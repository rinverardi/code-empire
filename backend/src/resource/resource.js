export class Resource {
    static get Constants() {
        return Object.freeze({
            respawnTime: 9
        });
    }

    static get Type() {
        return Object.freeze({
            food: 'food',
            gold: 'gold',
            research: 'research',
            weaponry: 'weaponry'
        })
    }
};
