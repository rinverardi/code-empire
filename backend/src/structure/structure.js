export class Structure {
    static get Type() {
        return Object.freeze({
            city: {
                collectsResources: true,
                requiredResources: { food: 8, gold: 8, research: 4 },
                requiredStructure: 'village',
            },
            factory: {
                collectsResources: false,
                requiredResources: { gold: 8, research: 12 }
            },
            metropolis: {
                collectsResources: true,
                requiredResources: { food: 12, gold: 12, research: 8 },
                requiredStructure: 'city',
            },
            village: {
                collectsResources: true,
                requiredResources: { food: 4, gold: 4 }
            },
        })
    }
};
