import { Player } from './player.js';

export class RankingView {
    #elements = {
        rankingList: document.getElementById('ranking-list')
    };

    bindGame(game) {
        this.#elements.rankingList.textContent = '';

        for (const rank of this.#rank(game.players)) {
            const rankElement = this.#buildRow(rank);

            this.#elements.rankingList.appendChild(rankElement);
        };
    }

    #buildColumn1(rank) {
        const element = document.createElement('div');

        element.classList.add('col-sm-2');
        element.textContent = rank.position ? `#${rank.position}` : '';

        return element;
    }

    #buildColumn2(rank) {
        const element = document.createElement('div');

        element.appendChild(this.#buildScoreIcon());
        element.appendChild(this.#buildSymbol());
        element.appendChild(this.#buildScore(rank));
        element.classList.add('col-sm-3');

        return element;
    }

    #buildColumn3(rank) {
        const element = document.createElement('div');

        element.classList.add('col-sm-7');
        element.textContent = `${rank.name}`;

        return element;
    }

    #buildRow(rank) {
        const element = document.createElement('div');

        element.classList.add('mb-2');
        element.classList.add('row');

        element.appendChild(this.#buildColumn1(rank));
        element.appendChild(this.#buildColumn2(rank));
        element.appendChild(this.#buildColumn3(rank));

        return element;
    }

    #buildScore(rank) {
        const element = document.createElement('span');

        element.classList.add('inventory');
        element.textContent = `${rank.score}`;

        return element;
    }

    #buildScoreIcon() {
        const element = document.createElement('div');

        element.classList.add('icon');
        element.classList.add('icon-gold');

        return element;
    }

    #buildSymbol() {
        const element = document.createElement('span');

        element.innerHTML = '&times;';

        return element;
    }

    #rank(players) {
        const ranking = players
            .filter(that => that.status === Player.Status.alive)
            .map(that => ({
                name: that.name,
                score: that.inventory.gold
            }))
            .sort((a, b) => b.score - a.score);

        for (let index = 0; index < ranking.length; index++) {
            if (index === 0) {
                ranking[index].position = 1;
            } else if (ranking[index].score < ranking[index - 1].score) {
                ranking[index].position = index + 1;
            }
        }

        return ranking;
    }
};
