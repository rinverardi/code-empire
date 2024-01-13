/**
 * This is not a data structure that represents an inventory! Rather, it is a
 * container class for inventory-related things.
 */

export class Inventory {

    /**
     * The inventory items that are supported.
     */

    static get Item() {
        return Object.freeze({
            food: 'food',
            gold: 'gold',
            research: 'research',
            weaponry: 'weaponry'
        });
    }
};
