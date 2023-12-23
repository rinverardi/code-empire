export class Authn {
    getPlayer(sessionContext, game) {
        for (const player of game.players) {
            if (player.id === sessionContext.playerId) {
                return player;
            }
        }

        throw new AuthnError('No such player');
    }
}

export class AuthnError extends Error {
    constructor(message) {
        super(message);

        this.name = 'AuthnError';
    }
}
