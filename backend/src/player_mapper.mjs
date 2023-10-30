export class PlayerMapper {
    #inventoryMapper;

    constructor(globalContext) {
        this.#inventoryMapper = globalContext.inventoryMapper();
    }

    map(sessionContext, source) {
        const target = {
            health: source.health,
            id: source.id,
            name: source.name,
            role: source.role,
            status: source.status
        };

        // TODO Check the role!

        if (sessionContext.playerId === source.id) {
            target.inventory = this.#inventoryMapper.map(sessionContext, source.inventory);
        }

        // TODO Check the visibility!

        target.position = source.position;

        return target;
    }
};