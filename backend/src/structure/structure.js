/**
 * This is not a data structure that represents a structure! Rather, it is a
 * container class for structure-related things.
 */

export class Structure {

    /**
     * The structure types that are supported.
     */

    static get Type() {
        return Object.freeze({
            city: {
                collectsResources: true,
                producesResources: false,
                requiredResources: { food: 8, gold: 8, research: 4 },
                requiredStructure: 'village'
            },
            factory: {
                collectsResources: false,
                producesResources: true,
                requiredResources: { gold: 8, research: 12 }
            },
            metropolis: {
                collectsResources: true,
                producesResources: false,
                requiredResources: { food: 12, gold: 12, research: 8 },
                requiredStructure: 'city',
                value: 'metropolis'
            },
            village: {
                collectsResources: true,
                producesResources: false,
                requiredResources: { food: 4, gold: 4 }
            },
        })
    }
};
