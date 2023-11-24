import { ChatService } from '../chat/chat_service.mjs';
import { GameAccess } from '../game/game_access.mjs';
import { GameManager } from '../game/game_manager.mjs';
import { GameController } from '../game/game_controller.mjs';
import { GameMapper } from '../game/game_mapper.mjs';
import { GameRepository } from '../game/game_repository.mjs';
import { GameService } from '../game/game_service.mjs';
import { InventoryManager } from '../inventory/inventory_manager.mjs';
import { MapAccess } from '../map/map_access.mjs';
import { MapMapper } from '../map/map_mapper.mjs';
import { PlayerManager } from '../player/player_manager.mjs';
import { PlayerMapper } from '../player/player_mapper.mjs';
import { PlayerService } from '../player/player_service.mjs';
import { ResourceManager } from '../resource/resource_manager.mjs';
import { ResourceMapper } from '../resource/resource_mapper.mjs';
import { StructureMapper } from '../structure/structure_mapper.mjs';
import { TurnManager } from '../turn/turn_manager.mjs';
import { TurnMapper } from '../turn/turn_mapper.mjs';
import { TurnService } from '../turn/turn_service.mjs';
import { VisibilityAccess } from '../visibility/visibility_access.mjs';
import { VisibilityManager } from '../visibility/visibility_manager.mjs';

export class GlobalContext {
    #chatService;
    #gameAccess;
    #gameManager;
    #gameController;
    #gameMapper;
    #gameRepository;
    #gameService;
    #inventoryManager;
    #mapAccess;
    #mapMapper;
    #playerManager;
    #playerMapper;
    #playerService;
    #resourceManager;
    #resourceMapper;
    #structureMapper;
    #turnManager;
    #turnMapper;
    #turnService;
    #visibilityAccess;
    #visibilityManager;

    chatService() {
        return this.#chatService ? this.#chatService : this.#chatService = new ChatService(this);
    }

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
        return this.#playerMapper ? this.#playerMapper : this.#playerMapper = new PlayerMapper();
    }

    playerService() {
        return this.#playerService ? this.#playerService : this.#playerService = new PlayerService(this);
    }

    resourceManager() {
        return this.#resourceManager ? this.#resourceManager : this.#resourceManager = new ResourceManager(this);
    }

    resourceMapper() {
        return this.#resourceMapper ? this.#resourceMapper : this.#resourceMapper = new ResourceMapper();
    }

    structureMapper() {
        return this.#structureMapper ? this.#structureMapper : this.#structureMapper = new StructureMapper();
    }

    turnManager() {
        return this.#turnManager ? this.#turnManager : this.#turnManager = new TurnManager(this);
    }

    turnMapper() {
        return this.#turnMapper ? this.#turnMapper : this.#turnMapper = new TurnMapper();
    }

    turnService() {
        return this.#turnService ? this.#turnService : this.#turnService = new TurnService(this);
    }

    visibilityAccess() {
        return this.#visibilityAccess ? this.#visibilityAccess : this.#visibilityAccess = new VisibilityAccess();
    }

    visibilityManager() {
        return this.#visibilityManager ? this.#visibilityManager : this.#visibilityManager = new VisibilityManager();
    }
};