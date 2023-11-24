import { Resource } from "./resource.js";

export class InventoryView {
    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    bindGame(game) {
        const me = this.#playerHelper.getMe(game);

        for (const resourceType in Resource.Type) {
            const inventoryElement = document.getElementById('inventory-' + resourceType);

            inventoryElement.textContent = `${me.inventory[resourceType]}`;
        }
    }
};
