import { MapTile } from './map.js';
import { Structure } from './structure.js';

export class TipView {
    #tips = [];

    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    bindGame(game) {
        this.#clear();

        // Add tips for players.

        for (const player of game.players) {
            if (player.position) {
                const tile = MapTile.element(...player.position);

                this.#tips.push(new bootstrap.Tooltip(tile, {
                    placement: 'bottom',
                    title: this.#labelPlayer(game, player)
                }));
            }
        }

        // Add tips for structures.

        for (const structure of game.structures) {
            const tile = MapTile.element(...structure.position);

            this.#tips.push(new bootstrap.Tooltip(tile, {
                placement: 'bottom',
                title: this.#labelStructure(game, structure)
            }));
        }
    }

    #clear() {
        this.#tips.forEach(that => that.dispose());

        this.#tips = [];
    }

    // TODO Translate me!

    #labelPlayer(game, player) {
        const me = this.#playerHelper.getMe(game);

        return player.id === me.id ? 'Ich' : player.name;
    }

    // TODO Translate me!

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

            switch (structure.type) {
                case Structure.Type.city: return `Stadt von ${player.name}`;
                case Structure.Type.factory: return `Fabrik von ${player.name}`;
                case Structure.Type.metropolis: return `Metropole von ${player.name}`;
                case Structure.Type.village: return `Dorf von ${player.name}`;
            }
        }

        throw new RangeError('No such structure');
    }
};
