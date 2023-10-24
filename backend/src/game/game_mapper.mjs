export class GameMapper {
    #mapMapper;
    #playerMapper;
    
    constructor(context) {
        this.#mapMapper = context.mapMapper;
        this.#playerMapper = context.playerMapper;
    }

    mapForAnyone(source) {
        const target = {
            game: {
                id: source.game.id,
                status: source.game.status
            },
            map: this.#mapMapper.mapForAnyone(source.map),
            players: []
        };

        for (const player of source.players) {
            target.players.push(this.#playerMapper.mapForAnyone(player));
        }

        return target;
    }
};