/**
 * This is not a data structure that represents a structure (e.g., city,
 * factory)! Rather, it is a container class for resource-related things.
 */

export class Structure {

    /**
     * Defines the structure types.
     */

    static get Type() {
        return Object.freeze({
            city: 'city',
            factory: 'factory',
            metropolis: 'metropolis',
            village: 'village'
        });
    }

    /**
     * Looks up an HTML element, given a structure.
     *
     * @param {object} player the structure
     * @returns {object} the HTML element
     */

    static element(structure) {
        return document.getElementById(Structure.elementId(structure));
    }

    /**
     * Looks up an HTML element ID, given a structure.
     *
     * @param {object} player the structure
     * @returns {object} the HTML element
     */

    static elementId(structure) {
        return `structure-${structure.position[0]}-${structure.position[1]}`;
    }
};

/**
 * Updates the structure-related portion of the user interface.
 */

export class StructureView {
    #elements = {
        structureLayer: document.getElementById('structure-layer')
    }

    /**
     * Updates the user inteface, given the current state of the game.
     *
     * @param {object} game the game
     */

    bindGame(game) {
        for (let structure of game.structures) {
            let structureElement = Structure.element(structure);

            if (!structureElement) {
                structureElement = this.#build(structure);

                this.#elements.structureLayer.appendChild(structureElement);
            }

            this.#update(structure, structureElement);
        }
    }

    #build(structure) {
        const structureElement = document.createElement('div');

        structureElement.classList.add('structure');
        structureElement.dataset.x = structure.position[0];
        structureElement.dataset.y = structure.position[1];
        structureElement.id = Structure.elementId(structure);
        structureElement.style.left = `${structure.position[0] * 40}px`;
        structureElement.style.top = `${structure.position[1] * 45 - 10}px`;

        return structureElement;
    }

    #update(structure, structureElement) {
        switch (structure.type) {
            case Structure.Type.city:
                structureElement.classList.remove('structure-village');
                structureElement.classList.add('structure-city');
                break;

            case Structure.Type.factory:
                structureElement.classList.add('structure-factory');
                break;

            case Structure.Type.metropolis:
                structureElement.classList.remove('structure-city');
                structureElement.classList.add('structure-metropolis');
                break;

            case Structure.Type.village:
                structureElement.classList.add('structure-village');
                break;
        }
    }
};
