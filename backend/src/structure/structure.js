export class Structure {
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
            },
            village: {
                collectsResources: true,
                producesResources: false,
                requiredResources: { food: 4, gold: 4 }
            },
        })
    }
};
