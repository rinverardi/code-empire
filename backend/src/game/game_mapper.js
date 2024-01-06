export class GameMapper {
    #mapMapper;
    #playerMapper;
    #resourceMapper;
    #structureMapper;
    #turnMapper;

    constructor(globalContext) {
        this.#mapMapper = globalContext.mapMapper();
        this.#playerMapper = globalContext.playerMapper();
        this.#resourceMapper = globalContext.resourceMapper();
        this.#structureMapper = globalContext.structureMapper();
        this.#turnMapper = globalContext.turnMapper();
    }

    map(sessionContext, source) {
        const target = {
            id: source.id,
            messages: source.messages,
            notifications: source.notifications,
            status: source.status,
            winner: source.winner
        };

        this.#mapMapper.mapInto(sessionContext, source, target);
        this.#playerMapper.mapInto(sessionContext, source, target);
        this.#resourceMapper.mapInto(sessionContext, source, target);
        this.#structureMapper.mapInto(sessionContext, source, target);
        this.#turnMapper.mapInto(sessionContext, source, target);

        return target;
    }
};
