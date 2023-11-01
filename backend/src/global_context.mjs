import { GameController } from './game_controller.mjs';
import { GameMapper } from './game_mapper.mjs';
import { GameRepository } from './game_repository.mjs';
import { GameService } from './game_service.mjs';
import { InventoryMapper } from './inventory_mapper.mjs';
import { MapMapper } from './map_mapper.mjs';
import { PlayerMapper } from './player_mapper.mjs';
import { ResourceMapper } from './resource_mapper.mjs';
import { StructureMapper } from './structure_mapper.mjs';
import { TurnMapper } from './turn_mapper.mjs';

export class GlobalContext {
    #gameController;
    #gameMapper;
    #gameRepository;
    #gameService;
    #inventoryMapper;
    #mapMapper;
    #playerMapper;
    #resourceMapper;
    #structureMapper;
    #turnMapper;

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

    inventoryMapper() {
        return this.#inventoryMapper ? this.#inventoryMapper : this.#inventoryMapper = new InventoryMapper();
    }

    mapMapper() {
        return this.#mapMapper ? this.#mapMapper : this.#mapMapper = new MapMapper();
    }

    playerMapper() {
        return this.#playerMapper ? this.#playerMapper : this.#playerMapper = new PlayerMapper(this);
    }

    resourceMapper() {
        return this.#resourceMapper ? this.#resourceMapper : this.#resourceMapper = new ResourceMapper();
    }

    structureMapper() {
        return this.#structureMapper ? this.#structureMapper : this.#structureMapper = new StructureMapper();
    }

    turnMapper() {
        return this.#turnMapper ? this.#turnMapper : this.#turnMapper = new TurnMapper();
    }
};