import { GlobalConfig } from '../lib/global_config.js';
import { GlobalContext } from '../lib/global_context.js';
import { SessionContext } from '../lib/session_context.js';

/**
 * Provides high-level methods for working with highscores; e.g., submit
 * scores, load highscores (and watch for changes).
 * <p>
 * Typically, service methods are invoked from controller classes. If you find
 * yourself calling service methods from other classes, consider introducing a
 * helper class.
 */

export class HighscoreService {
    #gameRepository;
    #highscoreRepository;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the global context.
     *
     * @param {GlobalContext} globalContext holds the globally-scoped objects
     */

    constructor(globalContext) {
        this.#gameRepository = globalContext.gameRepository();
        this.#highscoreRepository = globalContext.highscoreRepository();
    }

    /**
     * Submits a new score for possible inclusion in the highscores.
     * <p>
     * Only the top ten scores are kept.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {Object} winner the winner of the game
     */

    async submitScore(sessionContext, winner) {
        const game = await this.#gameRepository.loadGame(sessionContext);
        const player = game.players.find(that => that.id === winner.player);

        var highscores = await this.#highscoreRepository.loadHighscores(sessionContext) ?? [];

        highscores.push({
            name: player.name,
            score: winner.scoreGold
        });

        highscores = highscores.sort((a, b) => b.score - a.score);

        if (highscores.length > GlobalConfig.highscores.maxEntries) {
            highscores.length = 10;
        }

        for (let index = 0; index < highscores.length; index++) {
            if (index === 0) {
                highscores[index].position = 1;
            } else if (highscores[index].score < highscores[index - 1].score) {
                highscores[index].position = index + 1;
            }
        }

        await this.#highscoreRepository.saveHighscores(sessionContext, highscores);
        await this.#highscoreRepository.publishHighscores(sessionContext, highscores);
    }

    /**
     * Watches the highscores, detects changes, and invokes a callback for
     * every change.
     *
     * @param {SessionContext} sessionContext holds the session-scoped objects
     * @param {function} onUpdate called for every change
     */

    async watchHighscores(sessionContext, onUpdate) {
        await this.#highscoreRepository.subscribeHighscores(sessionContext, highscores => {
            onUpdate(JSON.parse(highscores));
        });

        const highscores = await this.#highscoreRepository.loadHighscores(sessionContext);

        onUpdate(highscores);
    }
};
