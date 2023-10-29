export class GameMapper {
    #mapMapper;
    #playerMapper;
    #resourceMapper;
    #structureMapper;

    constructor(globalContext) {
        this.#mapMapper = globalContext.mapMapper();
        this.#playerMapper = globalContext.playerMapper();
        this.#resourceMapper = globalContext.resourceMapper();
        this.#structureMapper = globalContext.structureMapper();
    }

    map(sessionContext, source) {
        const target = {
            game: {
                id: source.game.id,
                status: source.game.status
            },
            map: this.#mapMapper.map(sessionContext, source.map),
            players: []
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
            target.turn = source.turn;
        }

        return target;
    }
};