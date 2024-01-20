import { GlobalConfig } from '../lib/global_config.js';
import { GlobalContext } from '../lib/global_context.js';
import { Map } from '../map/map.js';
import { Player } from './player.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Implement the player-related aspects of the game logic (i.e., the rules of
 * the game).
 */

export class PlayerManager {
    #gameAccess;
    #inventoryManager;
    #mapAccess;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
        this.#inventoryManager = globalContext.inventoryManager();
        this.#mapAccess = globalContext.mapAccess();
    }

    /**
     * Builds a new player.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {string} playerName the name for the player
     * @param {string} playerRole the role for the player
     * @returns {object} the player
     */

    buildPlayer(sessionContext, playerName, playerRole) {
        return {
            id: sessionContext.playerId,
            name: playerName,
            role: playerRole,
            status: Player.Status.alive,
            secret: sessionContext.playerSecret
        };
    }

    #collectResources(game) {
        const player = this.#gameAccess.getCurrentPlayer(game);
        const resource = this.#mapAccess.getResourceAt(game, ...player.position);

        if (resource && resource.age >= GlobalConfig.resources.respawnAfter) {
            player.inventory[resource.type]++;

            resource.age = -1;
        }
    }

    /**
     * Handles the end of a turn.
     *
     * @param {object} game the game
     */

    endTurn(game) {
        this.#collectResources(game);
    }

    #pickPosition(game) {
        while (true) {
            const position = this.#mapAccess.pickPosition(game);
            const tile = this.#mapAccess.getTileAt(game, ...position);

            if ([Map.Tile.forest, Map.Tile.grass, Map.Tile.hill].includes(tile)) {
                const player = this.#mapAccess.getPlayerAt(game, ...position);

                if (!player) {
                    return position;
                }
            }
        }
    }

    /**
     * Handles the start of a game.
     *
     * @param {object} game the game
     * @param {object} winner the winner
     */

    startGame(game) {
        const players = game.players.filter(that => that.status === Player.Status.alive);

        if (players.length < GlobalConfig.slots.minPlayers) {
            throw new RangeError('Too few players');
        }

        if (players.length > GlobalConfig.slots.maxPlayers) {
            throw new RangeError('Too many players');
        }

        for (const player of players) {
            player.health = GlobalConfig.players.initialHealth;
            player.inventory = this.#inventoryManager.buildInventory();
            player.position = this.#pickPosition(game);
        }
    }
};
