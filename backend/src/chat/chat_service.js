export class ChatService {
    #authn;
    #authz;
    #gameRepository;

    constructor(globalContext) {
        this.#authn = globalContext.authn();
        this.#authz = globalContext.authz();
        this.#gameRepository = globalContext.gameRepository();
    }

    async sendMessage(sessionContext, text) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = this.#authn.getPlayer(sessionContext, game);

        this.#authz.canSendMessage(game, player).orThrow();

        game.messages.push({
            player: sessionContext.playerId,
            text: text
        });

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }
};
