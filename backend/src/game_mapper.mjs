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
            map: this.#mapMapper.map(sessionContext, source.map),
            players: [],
            status: source.status
        };

        for (const player of source.players) {
            target.players.push(this.#playerMapper.map(sessionContext, player));
        }

        if (source.resources) {
            target.resources = this.#resourceMapper.map(sessionContext, source.resources);
        }

        if (source.structures) {
            target.structures = this.#structureMapper.map(sessionContext, source.structures);
        }

        if (source.turn) {
            target.turn = this.#turnMapper.map(sessionContext, source.turn);
        }

        return target;
    }
};