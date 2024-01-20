/**
 * This is not a data structure that represents a resource (e.g., food, gold)!
 * Rather, it is a container class for resource-related things.
 */

export class Resource {

    /**
     * Defines the resource types.
     */

    static get Type() {
        return Object.freeze({
            food: 'food',
            gold: 'gold',
            research: 'research',
            weaponry: 'weaponry'
        })
    }
};
