export class TurnMapper {
    map(sessionContext, source) {
        const target = {
            number: source.number,
            player: source.player
        };

        return target;
    }
};