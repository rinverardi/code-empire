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
    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

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

        this.#updateStyles(game);
    }

    #updateStyles(game) {
        const resourceElements = document.querySelectorAll('.resource');

        for (const resourceElement of resourceElements) {
            resourceElement.classList.remove('active');
        }

        if (game.turns) {
            const xList = game.turns.map(that => that.positionTo[0]);
            const yList = game.turns.map(that => that.positionTo[1]);

            if (this.#playerHelper.isCurrentPlayer(game)) {
                const playerPosition = this.#playerHelper.getPlayer(game).position;

                xList.push(playerPosition[0]);
                yList.push(playerPosition[1]);
            }

            for (const resourceElement of resourceElements) {
                const { x, y } = resourceElement.dataset;

                if (xList.includes(parseInt(x)) && yList.includes(parseInt(y))) {
                    resourceElement.classList.add('active');
                }
            }
        }
    }
};
