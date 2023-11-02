import { GameBuilder } from './game_builder.mjs';
import { GameController } from './game_controller.mjs';
import { GameMapper } from './game_mapper.mjs';
import { GameRepository } from './game_repository.mjs';
import { GameService } from './game_service.mjs';
import { InventoryBuilder } from './inventory_builder.mjs';
import { InventoryMapper } from './inventory_mapper.mjs';
import { MapMapper } from './map_mapper.mjs';
import { PlayerBuilder } from './player_builder.mjs';
import { PlayerMapper } from './player_mapper.mjs';
import { PlayerService } from './player_service.mjs';
import { ResourceMapper } from './resource_mapper.mjs';
import { StructureMapper } from './structure_mapper.mjs';
import { TurnMapper } from './turn_mapper.mjs';

export class GlobalContext {
    #gameBuilder;
    #gameController;
    #gameMapper;
    #gameRepository;
    #gameService;
    #inventoryBuilder;
    #inventoryMapper;
    #mapMapper;
    #playerBuilder;
    #playerMapper;
    #playerService;
    #resourceMapper;
    #structureMapper;
    #turnMapper;

    gameBuilder() {
        return this.#gameBuilder ? this.#gameBuilder : this.#gameBuilder = new GameBuilder(this);
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

    inventoryBuilder() {
        return this.#inventoryBuilder ? this.#inventoryBuilder : this.#inventoryBuilder = new InventoryBuilder();
    }

    inventoryMapper() {
        return this.#inventoryMapper ? this.#inventoryMapper : this.#inventoryMapper = new InventoryMapper();
    }

    mapMapper() {
        return this.#mapMapper ? this.#mapMapper : this.#mapMapper = new MapMapper();
    }

    playerBuilder() {
        return this.#playerBuilder ? this.#playerBuilder : this.#playerBuilder = new PlayerBuilder(this);
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

    turnMapper() {
        return this.#turnMapper ? this.#turnMapper : this.#turnMapper = new TurnMapper();
    }
};