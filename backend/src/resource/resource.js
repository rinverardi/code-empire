/**
 * This is not a data structure that represents a resource! Rather, it is a
 * container class for resource-related things.
 */

export class Resource {

    /**
     * The resource types that are supported.
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
