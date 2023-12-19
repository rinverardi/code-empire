import { Map } from '../map/map.js';
import { Structure } from '../structure/structure.js';
import { Turn } from './turn.js';

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

    #canBuild(game, structurePosition, structureType) {
        const inventory = this.#gameAccess.getCurrentPlayer(game).inventory;

        for (const [resource, resourceCount] of Object.entries(structureType.requiredResources)) {
            if (inventory[resource] < resourceCount) {
                return false;
            }
        }

        const resource = this.#mapAccess.getResourceAt(game, ...structurePosition);

        if (resource) {
            return false;
        }

        const structure = this.#mapAccess.getStructureAt(game, ...structurePosition);

        if (structure?.type !== structureType.requiredStructure) {
            return false;
        }

        const tile = this.#mapAccess.getTileAt(game, ...structurePosition);

        if (tile !== Map.Tile.grass) {
            return false;
        }

        return true;
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

    endTurn(game) {
        const player = this.#gameAccess.getNextPlayer(game);

        game.turn.player = player.id;
    }

    executeTurn(game, turn) {
        const player = this.#gameAccess.getCurrentPlayer(game);

        // TODO Fix me!

        if (turn.type === Turn.Type.move) {
            player.position = turn.positionTo;
        }
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

        for (const structure of Object.values(Structure.Type)) {
            if (this.#canBuild(game, positionFrom, structure)) {
                game.turns.push({
                    'position': positionFrom,
                    'type': structure.turn
                });
            }
        }
    }
};
