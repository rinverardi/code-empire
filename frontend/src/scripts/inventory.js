import { Resource } from './resource.js';

/**
 * Updates the inventory-related portion of the user interface.
 */

export class InventoryView {
    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    /**
     * Updates the user inteface, given the current state of the game.
     *
     * @param {object} game the game
     */

    bindGame(game) {
        const me = this.#playerHelper.getMe(game);

        for (const resourceType in Resource.Type) {
            const inventoryElement = document.getElementById('inventory-' + resourceType);

            inventoryElement.textContent = `${me.inventory[resourceType]}`;
        }
    }
};
