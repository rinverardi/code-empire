/**
 * This is not a data structure that represents a resource (e.g., food, gold)!
 * Rather, it is a container class for resource-related things.
 */

export class Resource {

    /**
     * Defines the resource types.
     * <p>
     * These constants are also defined in the frontend code. If you change any
     * of them, ensure that you apply the same modifications in both places.
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
