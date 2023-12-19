export class Structure {
    static get Type() {
        return Object.freeze({
            city: {
                requiredResources: { food: 8, gold: 8, research: 4 },
                requiredStructure: 'village',
            },
            factory: {
                requiredResources: { gold: 8, research: 12 }
            },
            metropolis: {
                requiredResources: { food: 12, gold: 12, research: 8 },
                requiredStructure: 'city',
            },
            village: {
                requiredResources: { food: 4, gold: 4 }
            },
        })
    }
};
