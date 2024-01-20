import { Context } from './context.js';
import { Html } from './util.js';
import { MapTile } from './map.js';
import { Player } from './player.js';
import { Structure } from './structure.js';

/**
 * Manages tooltips.
 */

export class TipManager {
    #tips = {};

    /**
     * Adds a tooltip to an HTML element.
     *
     * @param {id} id the HTML element ID
     * @param {message} title the title of the tooltip
     */

    addTip(id, title) {
        this.removeTip(id);

        this.#tips[id] = new bootstrap.Tooltip(document.getElementById(id), {
            html: true,
            placement: 'bottom',
            title
        });
    }

    /**
     * Removes all tooltips.
     */

    clearTips() {
        Object.values(this.#tips).forEach(that => that.dispose());

        this.#tips = {};
    }

    /**
     * Removes the tooltip from an HTML element.
     *
     * @param {string} id the HTML element ID
     */

    removeTip(id) {
        if (this.#tips[id]) {
            this.#tips[id].dispose();

            delete this.#tips[id];
        }
    }
}

/**
 * Updates the tooltip-related portion of the user interface.
 */

export class TipView {
    #playerHelper;
    #tipManager;
    #translation;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the context.
     *
     * @param {Context} context holds the globally-scoped objects
     */

    constructor(context) {
        this.#playerHelper = context.playerHelper();
        this.#tipManager = context.tipManager();
        this.#translation = context.translation();
    }

    /**
     * Updates the user inteface, given the current state of the game.
     *
     * @param {object} game the game
     */

    bindGame(game) {
        this.#tipManager.clearTips();

        // Add tips for players.

        for (const player of game.players) {
            if (player.position && player.status === Player.Status.alive) {
                const tileId = MapTile.elementId(...player.position);

                this.#tipManager.addTip(tileId, this.#labelPlayer(game, player));
            }
        }

        // Add tips for structures.

        for (const structure of game.structures) {
            const tileId = MapTile.elementId(...structure.position);

            this.#tipManager.addTip(tileId, this.#labelStructure(game, structure));
        }
    }

    #labelPlayer(game, player) {
        const me = this.#playerHelper.getMe(game);

        const playerName = player.id === me.id ? this.#translation.tip('me') : Html.escape(player.name);
        const playerHealth = Html.escape(player.health);

        return this.#translation.tip('player', [playerName, playerHealth]);
    }

    #labelStructure(game, structure) {
        const me = this.#playerHelper.getMe(game);

        if (structure.player === me.id) {
            switch (structure.type) {
                case Structure.Type.city:
                    return this.#translation.structure('yourCity');

                case Structure.Type.factory:
                    return this.#translation.structure('yourFactory');

                case Structure.Type.metropolis:
                    return this.#translation.structure('yourMetropolis');

                case Structure.Type.village:
                    return this.#translation.structure('yourVillage');
            }
        } else {
            const player = this.#playerHelper.getPlayer(game, structure.player);
            const playerName = Html.escape(player.name);

            switch (structure.type) {
                case Structure.Type.city:
                    return this.#translation.structure('someonesCity', [playerName]);

                case Structure.Type.factory:
                    return this.#translation.structure('someonesFactory', [playerName]);

                case Structure.Type.metropolis:
                    return this.#translation.structure('someonesMetropolis', [playerName]);

                case Structure.Type.village:
                    return this.#translation.structure('someonesVillage', [playerName]);
            }
        }

        throw new RangeError('No such structure');
    }
};
