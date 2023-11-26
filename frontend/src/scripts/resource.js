export class Resource {
    static get Constants() {
        return Object.freeze({
            respawnTime: 9
        });
    }

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
    bindGame(game) {
        const mapElement = document.getElementById('map');

        for (let resource of game.resources) {
            let resourceElement = Resource.element(resource);

            if (!resourceElement) {
                resourceElement = this.#build(resource);

                mapElement.appendChild(resourceElement);
            }

            this.#update(resource, resourceElement);
        }
    }

    #build(resource) {
        const resourceElement = document.createElement('div');

        resourceElement.classList.add('resource');
        resourceElement.classList.add('resource-' + resource.type);
        resourceElement.dataset.x = resource.position[0];
        resourceElement.dataset.y = resource.position[1];
        resourceElement.id = Resource.elementId(resource);
        resourceElement.style.left = `${resource.position[0] * 40 + 10}px`;
        resourceElement.style.top = `${resource.position[1] * 45}px`;

        return resourceElement;
    }

    #update(resource, resourceElement) {
        for (let age = 0; age <= Resource.Constants.respawnTime; age++) {
            if (resource.age === age) {
                resourceElement.classList.add('age-' + age);
            } else {
                resourceElement.classList.remove('age-' + age);
            }
        }
    }
};