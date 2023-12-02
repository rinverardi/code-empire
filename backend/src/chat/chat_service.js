export class ChatService {
    #gameRepository;

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
    }

    async sendMessage(sessionContext, text) {

        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        game.messages.push({
            player: sessionContext.playerId,
            text: text
        });

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }
};
