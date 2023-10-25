import { SessionContext } from "../lib/session_context.mjs";

export class PlayerAuthentication {
    #gameRepository;

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
    }

    async authenticate(wsConnection, wsParams) {
        const sessionContext = new SessionContext(wsConnection);

        sessionContext.gameId = wsParams[0];
        sessionContext.playerId = wsParams[1];
        sessionContext.playerSecret = wsParams[2];

        const game = await this.#gameRepository.loadGame(sessionContext);

        if (game != null) {
            for (const player of game.players) {
                if (player.id === wsParams[1] && player.secret === wsParams[2]) {
                    sessionContext.playerRole = player.role;
                    break;
                }
            }
        }

        return sessionContext;
    }
};