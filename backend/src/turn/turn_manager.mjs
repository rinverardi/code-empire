import { Map } from '../map/map.mjs';
import { Turn } from './turn.mjs';

export class TurnManager {
    #gameAccess;
    #mapAccess;

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
        this.#mapAccess = globalContext.mapAccess();
    }

    #canAttack(game, position) {
        const player = this.#mapAccess.getPlayerAt(game, ...position);

        return !!player;
    }

    #canMove(game, position) {
        const player = this.#mapAccess.getPlayerAt(game, ...position);

        if (!player) {
            const tile = this.#mapAccess.getTileAt(game, ...position);

            if ([Map.Tile.forest, Map.Tile.grass, Map.Tile.hill].includes(tile)) {
                return true;
            }
        }

        return false;
    }

    startGame(game) {
        game.turn = {
            number: 1,
            player: game.players[0].id
        }
    }

    startTurn(game) {
        const positionFrom = this.#gameAccess.getCurrentPlayer(game).position;

        game.turns = [];

        for (const [directionId, direction] of Object.entries(Turn.Direction)) {
            const positionTo = [positionFrom[0] + direction.x, positionFrom[1] + direction.y];

            if (this.#canAttack(game, positionTo)) {
                game.turns.push({
                    'direction': directionId,
                    'positionFrom': positionFrom,
                    'positionTo': positionTo,
                    'type': Turn.Type.attack
                });
            }

            if (this.#canMove(game, positionTo)) {
                game.turns.push({
                    'direction': directionId,
                    'positionFrom': positionFrom,
                    'positionTo': positionTo,
                    'type': Turn.Type.move
                });
            }
        }
    }
};