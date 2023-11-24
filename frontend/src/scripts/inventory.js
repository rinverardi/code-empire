import { Resource } from "./resource.js";

export class InventoryView {
    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    bindGame(game) {
        const player = this.#playerHelper.getPlayer(game);

        for (const resourceType in Resource.Type) {
            const inventoryElement = document.getElementById('inventory-' + resourceType);

            inventoryElement.textContent = `${player.inventory[resourceType]}`;
        }
    }
};
