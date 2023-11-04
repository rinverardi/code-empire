export class PlayerMapper {

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

            if (sourcePlayer.id === sessionContext.playerId) {
                targetPlayer.inventory = sourcePlayer.inventory;
            }

            target.players.push(targetPlayer);
        }
    }
};