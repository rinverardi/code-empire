import { GlobalConfig } from '../lib/global_config.js';
import { Inventory } from './inventory.js';

export class InventoryManager {
    buildInventory() {
        const inventory = {}

        inventory[Inventory.Item.food] = GlobalConfig.players.initialFood;
        inventory[Inventory.Item.gold] = GlobalConfig.players.initialGold;
        inventory[Inventory.Item.research] = GlobalConfig.players.initialResearch;
        inventory[Inventory.Item.weaponry] = GlobalConfig.players.initialWeaponry;

        return inventory;
    }
};
