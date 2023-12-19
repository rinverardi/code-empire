export class Structure {
    static element(structure) {
        return document.getElementById(Structure.elementId(structure));
    }

    static elementId(structure) {
        return `structure-${structure.position[0]}-${structure.position[1]}`;
    }
};

export class StructureView {
    #elements = {
        structureLayer: document.getElementById('structure-layer')
    }

    bindGame(game) {
        for (let structure of game.structures) {
            let structureElement = Structure.element(structure);

            if (!structureElement) {
                structureElement = this.#build(structure);

                this.#elements.structureLayer.appendChild(structureElement);
            }
        }
    }

    #build(structure) {
        const structureElement = document.createElement('div');

        structureElement.classList.add('structure');
        structureElement.classList.add('structure-' + structure.type);
        structureElement.dataset.x = structure.position[0];
        structureElement.dataset.y = structure.position[1];
        structureElement.id = Structure.elementId(structure);
        structureElement.style.left = `${structure.position[0] * 40}px`;
        structureElement.style.top = `${structure.position[1] * 45 - 10}px`;

        return structureElement;
    }
};
