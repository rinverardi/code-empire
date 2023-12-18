import { Turn } from '../turn/turn.js';

export class Structure {
    static get Type() {
        return Object.freeze({
            city: {
                requiredResources: { food: 8, gold: 8, research: 4 },
                requiredStructure: 'village',
                turn: Turn.Type.buildCity
            },
            factory: {
                requiredResources: { gold: 8, research: 12 },
                turn: Turn.Type.buildFactory
            },
            metropolis: {
                requiredResources: { food: 12, gold: 12, research: 8 },
                requiredStructure: 'city',
                turn: Turn.Type.buildMetropolis
            },
            village: {
                requiredResources: { food: 4, gold: 4 },
                turn: Turn.Type.buildVillage
            },
        })
    }
};
