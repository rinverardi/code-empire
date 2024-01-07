import { Map } from '../map/map.js';
import { Notification } from '../notification/notification.js';
import { Player } from '../player/player.js';
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

        if (structure) {
            const player = this.#gameAccess.getCurrentPlayer(game);

            if (structure.player !== player.id || structure.type !== structureType.requiredStructure) {
                return false;
            }
        } else if (structureType.requiredStructure) {
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

    // TODO Fix me!

    #doAttack(game, turn) {
        const victim = this.#mapAccess.getPlayerAt(game, ...turn.positionTo);

        if (--victim.health > 0) {
            game.notifications.push({
                attacker: game.turn.player,
                victim: victim.id,
                type: Notification.Type.attack
            });
        } else {
            game.notifications.push({
                attacker: game.turn.player,
                victim: victim.id,
                type: Notification.Type.kill
            });

            victim.status = Player.Status.dead;
        }
    }

    #doBuild(game, turn) {
        const player = this.#gameAccess.getCurrentPlayer(game);

        // Update the inventory.

        const resources = Structure.Type[turn.structure].requiredResources;

        for (const [resourceType, resourceCount] of Object.entries(resources)) {
            player.inventory[resourceType] -= resourceCount;
        }

        // Update the structures.

        const structure = this.#mapAccess.getStructureAt(game, ...turn.position);

        if (structure) {
            structure.type = turn.structure;
        } else {
            game.structures.push({
                player: player.id,
                position: turn.position,
                type: turn.structure
            });
        }
    }

    #doMove(game, turn) {
        const player = this.#gameAccess.getCurrentPlayer(game);

        player.position = turn.positionTo;
    }

    endTurn(game) {
        const player = this.#gameAccess.getNextPlayer(game);

        game.turn.player = player.id;
    }

    executeTurn(game, turn) {
        game.notifications = [];

        // TODO Validate moves!

        switch (turn.type) {
            case Turn.Type.attack:
                this.#doAttack(game, turn);
                break;

            case Turn.Type.build:
                this.#doBuild(game, turn);
                break;

            case Turn.Type.move:
                this.#doMove(game, turn);
                break;

            default:
                throw new RangeError('No such turn');
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

        for (const [structureId, structure] of Object.entries(Structure.Type)) {
            if (this.#canBuild(game, positionFrom, structure)) {
                game.turns.push({
                    'position': positionFrom,
                    'structure': structureId,
                    'type': Turn.Type.build
                });
            }
        }
    }
};
