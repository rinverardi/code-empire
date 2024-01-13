import { GlobalConfig } from '../lib/global_config.js';
import { Inventory } from './inventory.js';

/**
 * Implement the inventory-related aspects of the game logic (i.e., the rules
 * of the game).
 */

export class InventoryManager {

    /**
     * Builds a new inventory.
     *
     * @returns {object} the inventory
     */

    buildInventory() {
        const inventory = {}

        inventory[Inventory.Item.food] = GlobalConfig.players.initialFood;
        inventory[Inventory.Item.gold] = GlobalConfig.players.initialGold;
        inventory[Inventory.Item.research] = GlobalConfig.players.initialResearch;
        inventory[Inventory.Item.weaponry] = GlobalConfig.players.initialWeaponry;

        return inventory;
    }
};
