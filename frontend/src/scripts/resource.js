export class Resource {
    static get Type() {
        return Object.freeze({
            food: 'images/resource-food.svg',
            gold: 'images/resource-gold.svg',
            research: 'images/resource-research.svg',
            weaponry: 'images/resource-weaponry.svg'
        });
    }

    static element(resource) {
        return document.getElementById(Resource.elementId(resource));
    }

    static elementId(resource) {
        return `resource-${resource.position[0]}-${resource.position[1]}`;
    }
};

export class ResourceView {
    #addResource(resource) {
        const resourceElement = document.createElement('img');

        resourceElement.classList.add('resource');
        resourceElement.dataset.x = resource.position[0];
        resourceElement.dataset.y = resource.position[1];
        resourceElement.id = Resource.elementId(resource);
        resourceElement.src = Resource.Type[resource.type];
        resourceElement.style.left = `${resource.position[0] * 40 + 10}px`;
        resourceElement.style.top = `${resource.position[1] * 45}px`;

        return resourceElement;
    }

    bindGame(game) {
        const mapElement = document.getElementById('map');

        for (let resource of game.resources) {
            let resourceElement = Resource.element(resource);

            if (!resourceElement) {
                resourceElement = this.#addResource(resource);

                mapElement.appendChild(resourceElement);
            }
        }
    }
};
