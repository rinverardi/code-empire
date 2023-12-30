import { Game } from './game.js';

export class WinnerView {
    #elements = {
        objectiveHaveGold: document.getElementById('objective-have-gold'),
        objectiveHaveMetropolises: document.getElementById('objective-have-metropolises'),
        objectiveSurvive: document.getElementById('objective-survive'),
        scoreGold: document.getElementById('score-gold'),
        scoreMetropolises: document.getElementById('score-metropolises'),
        winner: document.querySelectorAll('.winner')
    };

    bindGame(game) {
        this.#updateObjectives(game);
        this.#updateParams(game);
    }

    #updateObjectives(game) {
        switch (game.winner.objective) {
            case Game.Objective.haveGold:
                this.#elements.objectiveHaveGold.classList.remove('hidden');
                break;

            case Game.Objective.haveMetropolises:
                this.#elements.objectiveHaveMetropolises.classList.remove('hidden');
                break;

            case Game.Objective.survive:
                this.#elements.objectiveSurvive.classList.remove('hidden');
                break;

            default:
                throw new RangeError('No such objective');
        }
    }

    #updateParams(game) {
        const player = game.players.find(that => that.id === game.winner.player);

        this.#elements.scoreGold.textContent = game.winner.scoreGold;
        this.#elements.scoreMetropolises.textContent = game.winner.scoreMetropolises;

        for (const element of this.#elements.winner) {
            element.textContent = player.name;
        }
    }
};
