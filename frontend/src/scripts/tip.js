import { Html } from './util.js';
import { MapTile } from './map.js';
import { Structure } from './structure.js';

export class TipManager {
    #tips = {};

    addTip(id, title) {
        this.removeTip(id);

        this.#tips[id] = new bootstrap.Tooltip(document.getElementById(id), {
            html: true,
            placement: 'bottom',
            title
        });
    }

    clearTips() {
        Object.values(this.#tips).forEach(that => that.dispose());

        this.#tips = {};
    }

    removeTip(id) {
        if (this.#tips[id]) {
            this.#tips[id].dispose();

            delete this.#tips[id];
        }
    }
}

export class TipView {
    #playerHelper;
    #tipManager;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
        this.#tipManager = context.tipManager();
    }

    bindGame(game) {
        this.#tipManager.clearTips();

        // Add tips for players.

        for (const player of game.players) {
            if (player.position) {
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

        const playerName = player.id === me.id ? "Ich" : Html.escape(player.name);
        const playerHealth = Html.escape(player.health);

        return `${playerName}<br>(${playerHealth} Trefferpunkte)`;
    }

    #labelStructure(game, structure) {
        const me = this.#playerHelper.getMe(game);

        if (structure.player === me.id) {
            switch (structure.type) {
                case Structure.Type.city: return 'Meine Stadt';
                case Structure.Type.factory: return 'Meine Fabrik';
                case Structure.Type.metropolis: return 'Meine Metropole';
                case Structure.Type.village: return 'Mein Dorf';
            }
        } else {
            const player = this.#playerHelper.getPlayer(game, structure.player);
            const playerName = Html.escape(player.name);

            switch (structure.type) {
                case Structure.Type.city: return `Stadt von ${playerName}`;
                case Structure.Type.factory: return `Fabrik von ${playerName}`;
                case Structure.Type.metropolis: return `Metropole von ${playerName}`;
                case Structure.Type.village: return `Dorf von ${playerName}`;
            }
        }

        throw new RangeError('No such structure');
    }
};
