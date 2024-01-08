import { Game } from './game.js';
import { Html } from './util.js';

export class WinnerView {
    #elements = {
        result: document.getElementById('result')
    };

    #translation;

    constructor(context) {
        this.#translation = context.translation();
    }

    bindGame(game) {
        const player = game.players.find(that => that.id === game.winner.player);

        switch (game.winner.objective) {
            case Game.Objective.haveGold:
                this.#elements.result.innerHTML = this.#translation.result(
                    'winnerHasGold',
                    [Html.escape(player.name), Html.escape(game.winner.scoreGold)]);
                break;

            case Game.Objective.haveMetropolises:
                this.#elements.result.innerHTML = this.#translation.result(
                    'winnerHasMetropolises',
                    [Html.escape(player.name), Html.escape(game.winner.scoreMetropolises)]);
                break;

            case Game.Objective.survive:
                this.#elements.result.innerHTML = this.#translation.result(
                    'winnerSurvives',
                    [Html.escape(player.name)]);
                break;

            default:
                throw new RangeError('No such objective');
        }
    }
};
