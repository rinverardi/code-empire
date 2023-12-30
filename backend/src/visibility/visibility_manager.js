import { Player } from '../player/player.js';
import { Turn } from '../turn/turn.js';
import { Visibility } from './visibility.js';

export class VisibilityManager {
    #gameAccess;
    #visibilityAccess;

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

    endTurn(game) {
        const player = this.#gameAccess.getCurrentPlayer(game);

        this.#clearUp(player);
    }

    startGame(game) {
        const players = game.players.filter(that => that.status === Player.Status.alive);

        for (const player of players) {
            player.visibility = game.map.tiles.map(that => that.replace(/[^ ]/g, Visibility.obscured));

            this.#clearUp(player);
        }
    }
};
