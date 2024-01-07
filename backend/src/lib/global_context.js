import { Authn } from './authn.js';
import { Authz } from './authz.js';
import { ChatService } from '../chat/chat_service.js';
import { GameAccess } from '../game/game_access.js';
import { GameManager } from '../game/game_manager.js';
import { GameController } from '../game/game_controller.js';
import { GameMapper } from '../game/game_mapper.js';
import { GameRepository } from '../game/game_repository.js';
import { GameService } from '../game/game_service.js';
import { HighscoreRepository } from '../highscore/highscore_repository.js';
import { HighscoreService } from '../highscore/highscore_service.js';
import { InventoryManager } from '../inventory/inventory_manager.js';
import { InventoryMapper } from '../inventory/inventory_mapper.js';
import { MapAccess } from '../map/map_access.js';
import { MapMapper } from '../map/map_mapper.js';
import { PlayerAccess } from '../player/player_access.js';
import { PlayerManager } from '../player/player_manager.js';
import { PlayerMapper } from '../player/player_mapper.js';
import { PlayerService } from '../player/player_service.js';
import { ResourceManager } from '../resource/resource_manager.js';
import { ResourceMapper } from '../resource/resource_mapper.js';
import { StructureManager } from '../structure/structure_manager.js';
import { StructureMapper } from '../structure/structure_mapper.js';
import { TurnManager } from '../turn/turn_manager.js';
import { TurnMapper } from '../turn/turn_mapper.js';
import { TurnService } from '../turn/turn_service.js';
import { VisibilityAccess } from '../visibility/visibility_access.js';
import { VisibilityManager } from '../visibility/visibility_manager.js';

export class GlobalContext {
    #authn;
    #authz;
    #chatService;
    #gameAccess;
    #gameManager;
    #gameController;
    #gameMapper;
    #gameRepository;
    #gameService;
    #highscoreRepository;
    #highscoreService;
    #inventoryManager;
    #inventoryMapper;
    #mapAccess;
    #mapMapper;
    #playerAccess;
    #playerManager;
    #playerMapper;
    #playerService;
    #resourceManager;
    #resourceMapper;
    #structureManager;
    #structureMapper;
    #turnManager;
    #turnMapper;
    #turnService;
    #visibilityAccess;
    #visibilityManager;

    authn() {
        return this.#authn ? this.#authn : this.#authn = new Authn();
    }

    authz() {
        return this.#authz ? this.#authz : this.#authz = new Authz();
    }

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

    highscoreRepository() {
        return this.#highscoreRepository ? this.#highscoreRepository : this.#highscoreRepository = new HighscoreRepository();
    }

    highscoreService() {
        return this.#highscoreService ? this.#highscoreService : this.#highscoreService = new HighscoreService(this);
    }

    inventoryManager() {
        return this.#inventoryManager ? this.#inventoryManager : this.#inventoryManager = new InventoryManager();
    }

    inventoryMapper() {
        return this.#inventoryMapper ? this.#inventoryMapper : this.#inventoryMapper = new InventoryMapper(this);
    }

    mapAccess() {
        return this.#mapAccess ? this.#mapAccess : this.#mapAccess = new MapAccess();
    }

    mapMapper() {
        return this.#mapMapper ? this.#mapMapper : this.#mapMapper = new MapMapper(this);
    }

    playerAccess() {
        return this.#playerAccess ? this.#playerAccess : this.#playerAccess = new PlayerAccess();
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

    resourceManager() {
        return this.#resourceManager ? this.#resourceManager : this.#resourceManager = new ResourceManager(this);
    }

    resourceMapper() {
        return this.#resourceMapper ? this.#resourceMapper : this.#resourceMapper = new ResourceMapper(this);
    }

    structureManager() {
        return this.#structureManager ? this.#structureManager : this.#structureManager = new StructureManager(this);
    }

    structureMapper() {
        return this.#structureMapper ? this.#structureMapper : this.#structureMapper = new StructureMapper(this);
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
        return this.#visibilityManager ? this.#visibilityManager : this.#visibilityManager = new VisibilityManager(this);
    }
};
