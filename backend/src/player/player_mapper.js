export class PlayerMapper {
    #inventoryMapper;

    constructor(globalContext) {
        this.#inventoryMapper = globalContext.inventoryMapper();
    }

    // TODO Apply the visibility!

    mapInto(sessionContext, source, target) {
        target.players = [];

        for (const sourcePlayer of source.players) {
            const targetPlayer = {
                health: sourcePlayer.health,
                id: sourcePlayer.id,
                name: sourcePlayer.name,
                position: sourcePlayer.position,
                role: sourcePlayer.role,
                status: sourcePlayer.status
            };

            target.players.push(targetPlayer);
        }

        this.#inventoryMapper.mapInto(sessionContext, source, target);
    }
};
