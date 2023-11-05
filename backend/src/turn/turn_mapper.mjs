export class TurnMapper {
    mapInto(sessionContext, source, target) {
        if (source.turn) {
            target.turn = {
                id: source.turn.id,
                player: source.turn.player
            };

            if (sessionContext.playerId === source.turn.player) {
                target.turns = source.turns;
            }
        }
    }
};