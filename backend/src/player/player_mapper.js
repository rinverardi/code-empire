import { Visibility } from '../visibility/visibility.js';

export class PlayerMapper {
    #gameAccess;
    #inventoryMapper;

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
        this.#inventoryMapper = globalContext.inventoryMapper();
    }

    #applyVisibility(source, target, visibility) {
        for (let index = 0; index < source.players.length; index++) {
            const position = source.players[index].position;

            if (position && visibility[position[1]][position[0]] === Visibility.clear) {
                target.players[index].position = position;
            }
        }
    }

    mapInto(sessionContext, source, target) {
        target.players = [];

        for (const sourcePlayer of source.players) {
            const targetPlayer = {
                health: sourcePlayer.health,
                id: sourcePlayer.id,
                name: sourcePlayer.name,
                role: sourcePlayer.role,
                status: sourcePlayer.status
            };

            target.players.push(targetPlayer);
        }

        const visibility = this.#gameAccess.getVisibility(sessionContext, source);

        if (visibility) {
            this.#applyVisibility(source, target, visibility);
        }

        this.#inventoryMapper.mapInto(sessionContext, source, target);
    }
};
