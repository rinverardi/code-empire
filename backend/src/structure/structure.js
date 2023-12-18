import { Action } from '../action/action.js';

export class Structure {
    static get Type() {
        return Object.freeze({
            city: {
                action: Action.buildCity,
                requiredResources: { food: 8, gold: 8, research: 4 },
                requiredStructure: 'village'
            },
            factory: {
                action: Action.buildFactory,
                requiredResources: { gold: 8, research: 12 },
            },
            metropolis: {
                action: Action.buildMetropolis,
                requiredResources: { food: 12, gold: 12, research: 8 },
                requiredStructure: 'city'
            },
            village: {
                action: Action.buildVillage,
                requiredResources: { food: 4, gold: 4 }
            },
        })
    }
};
