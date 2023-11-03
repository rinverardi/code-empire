import { Inventory } from './inventory.mjs';

export class InventoryManager {
    buildInventory() {
        const inventory = {}

        for (const item in Inventory.Item) {
            inventory[item] = 0;
        }

        return inventory;
    }
};