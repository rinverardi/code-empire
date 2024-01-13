/**
 * This is not a data structure that represents an inventory! Rather, it is a
 * container class for inventory-related things.
 */

export class Inventory {

    /**
     * Defines the inventory items.
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
