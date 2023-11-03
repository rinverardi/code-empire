import { GameAccess } from './game_access.mjs';
import { GameManager } from './game_manager.mjs';
import { GameController } from './game_controller.mjs';
import { GameMapper } from './game_mapper.mjs';
import { GameRepository } from './game_repository.mjs';
import { GameService } from './game_service.mjs';
import { InventoryManager } from './inventory_manager.mjs';
import { InventoryMapper } from './inventory_mapper.mjs';
import { MapAccess } from './map_access.mjs';
import { MapMapper } from './map_mapper.mjs';
import { PlayerManager } from './player_manager.mjs';
import { PlayerMapper } from './player_mapper.mjs';
import { PlayerService } from './player_service.mjs';
import { ResourceMapper } from './resource_mapper.mjs';
import { StructureMapper } from './structure_mapper.mjs';
import { TurnManager } from './turn_manager.mjs';
import { TurnMapper } from './turn_mapper.mjs';
import { VisibilityAccess } from './visibility_access.mjs';

export class GlobalContext {
    #gameAccess;
    #gameManager;
    #gameController;
    #gameMapper;
    #gameRepository;
    #gameService;
    #inventoryManager;
    #inventoryMapper;
    #mapAccess;
    #mapMapper;
    #playerManager;
    #playerMapper;
    #playerService;
    #resourceMapper;
    #structureMapper;
    #turnManager;
    #turnMapper;
    #visibilityAccess;

    gameAccess() {
        return this.#gameAccess ? this.#gameAccess : this.#gameAccess = new GameAccess();
    }

    gameManager() {
        return this.#gameManager ? this.#gameManager : this.#gameManager = new GameManager(this);
    }

    gameController() {
        return this.#gameController ? this.#gameController : this.#gameController = new GameController(this);
    }

    gameMapper() {
        return this.#gameMapper ? this.#gameMapper : this.#gameMapper = new GameMapper(this);
    }

    gameRepository() {
        return this.#gameRepository ? this.#gameRepository : this.#gameRepository = new GameRepository();
    }

    gameService() {
        return this.#gameService ? this.#gameService : this.#gameService = new GameService(this);
    }

    inventoryManager() {
        return this.#inventoryManager ? this.#inventoryManager : this.#inventoryManager = new InventoryManager();
    }

    inventoryMapper() {
        return this.#inventoryMapper ? this.#inventoryMapper : this.#inventoryMapper = new InventoryMapper();
    }

    mapAccess() {
        return this.#mapAccess ? this.#mapAccess : this.#mapAccess = new MapAccess();
    }

    mapMapper() {
        return this.#mapMapper ? this.#mapMapper : this.#mapMapper = new MapMapper();
    }

    playerManager() {
        return this.#playerManager ? this.#playerManager : this.#playerManager = new PlayerManager(this);
    }

    playerMapper() {
        return this.#playerMapper ? this.#playerMapper : this.#playerMapper = new PlayerMapper(this);
    }

    playerService() {
        return this.#playerService ? this.#playerService : this.#playerService = new PlayerService(this);
    }

    resourceMapper() {
        return this.#resourceMapper ? this.#resourceMapper : this.#resourceMapper = new ResourceMapper();
    }

    structureMapper() {
        return this.#structureMapper ? this.#structureMapper : this.#structureMapper = new StructureMapper();
    }

    turnManager() {
        return this.#turnManager ? this.#turnManager : this.#turnManager = new TurnManager();
    }

    turnMapper() {
        return this.#turnMapper ? this.#turnMapper : this.#turnMapper = new TurnMapper();
    }

    visibilityAccess() {
        return this.#visibilityAccess ? this.#visibilityAccess : this.#visibilityAccess = new VisibilityAccess();
    }
};