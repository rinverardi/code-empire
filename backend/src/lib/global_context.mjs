import { GameController } from "../game/game_controller.mjs";
import { GameMapper } from "../game/game_mapper.mjs";
import { GameRepository } from "../game/game_repository.mjs";
import { GameService } from "../game/game_service.mjs";
import { MapMapper } from "../map/map_mapper.mjs";
import { PlayerAuthentication } from "../player/player_authentication.mjs";
import { PlayerMapper } from "../player/player_mapper.mjs";

export class GlobalContext {
    #gameController;
    #gameMapper;
    #gameRepository;
    #gameService;
    #mapMapper;
    #playerAuthentication;
    #playerMapper;

    gameController() {
        return this.#gameController
            ? this.#gameController
            : this.#gameController = new GameController(this);
    }
    
    gameMapper() {
        return this.#gameMapper
            ? this.#gameMapper
            : this.#gameMapper = new GameMapper(this);
    }
    
    gameRepository() {
        return this.#gameRepository
            ? this.#gameRepository
            : this.#gameRepository = new GameRepository();
    }
    
    gameService() {
        return this.#gameService
            ? this.#gameService
            : this.#gameService = new GameService(this);
    }

    mapMapper() {
        return this.#mapMapper
            ? this.#mapMapper
            : this.#mapMapper = new MapMapper();
    }

    playerAuthentication() {
        return this.#playerAuthentication
            ? this.#playerAuthentication
            : this.#playerAuthentication = new PlayerAuthentication(this);
    }

    playerMapper() {
        return this.#playerMapper
            ? this.#playerMapper
            : this.#playerMapper = new PlayerMapper();
    }
};