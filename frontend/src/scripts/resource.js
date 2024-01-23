import { Config } from './config.js';

/**
 * This is not a data structure that represents a resource (e.g., food, gold)!
 * Rather, it is a container class for resource-related things.
 */

export class Resource {

    /**
     * Defines the resource types.
     */

    static get Type() {
        return Object.freeze({
            food: 'food',
            gold: 'gold',
            research: 'research',
            weaponry: 'weaponry'
        });
    }

    /**
     * Looks up an HTML element, given a resource.
     *
     * @param {object} player the resource
     * @returns {object} the HTML element
     */

    static element(resource) {
        return document.getElementById(Resource.elementId(resource));
    }

    /**
     * Looks up an HTML element ID, given a resource.
     *
     * @param {object} player the resource
     * @returns {object} the HTML element
     */

    static elementId(resource) {
        return `resource-${resource.position[0]}-${resource.position[1]}`;
    }
};

/**
 * Updates the resource-related portion of the user interface.
 */

export class ResourceView {
    #elements = {
        resourceLayer: document.getElementById('resource-layer')
    }

    /**
     * Updates the user inteface, given the current state of the game.
     *
     * @param {object} game the game
     */

    bindGame(game) {
        for (let resource of game.resources) {
            let resourceElement = Resource.element(resource);

            if (!resourceElement) {
                resourceElement = this.#build(resource);

                this.#elements.resourceLayer.appendChild(resourceElement);
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
        for (let age = 0; age <= Config.respawnTime; age++) {
            if (resource.age === age) {
                resourceElement.classList.add('age-' + age);
            } else {
                resourceElement.classList.remove('age-' + age);
            }
        }
    }
};
