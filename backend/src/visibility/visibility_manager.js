import { GlobalContext } from '../lib/global_context.js';
import { Player } from '../player/player.js';
import { Turn } from '../turn/turn.js';
import { Visibility } from './visibility.js';

/**
 * Implement the visibility-related aspects of the game logic (i.e., the rules
 * of the game).
 */

export class VisibilityManager {
    #gameAccess;
    #visibilityAccess;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
        this.#visibilityAccess = globalContext.visibilityAccess();
    }

    #clearUp(player) {
        const [playerX, playerY] = player.position;

        this.#visibilityAccess.setVisibilityAt(player, playerX, playerY, Visibility.clear);

        for (const direction of Object.values(Turn.Direction)) {
            const tileX = playerX + direction.x;
            const tileY = playerY + direction.y;

            this.#visibilityAccess.setVisibilityAt(player, tileX, tileY, Visibility.clear);
        }
    }

    /**
     * Handles the end of a turn.
     *
     * @param {object} game the game
     */

    endTurn(game) {
        const player = this.#gameAccess.getCurrentPlayer(game);

        this.#clearUp(player);
    }

    /**
     * Handles the start of a game.
     *
     * @param {object} game the game
     */

    startGame(game) {
        const players = game.players.filter(that => that.status === Player.Status.alive);

        for (const player of players) {
            player.visibility = game.map.tiles.map(that => that.replace(/[^ ]/g, Visibility.obscured));

            this.#clearUp(player);
        }
    }
};
