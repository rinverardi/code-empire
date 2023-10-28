export class GameMapper {
    #mapMapper;
    #playerMapper;

    constructor(globalContext) {
        this.#mapMapper = globalContext.mapMapper();
        this.#playerMapper = globalContext.playerMapper();
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

        return target;
    }
};