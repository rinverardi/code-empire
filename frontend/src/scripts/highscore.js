/**
 * Updates the highscore-related portion of the user interface.
 */

export class HighscoreView {
    #elements = {
        highscoreList: document.getElementById('highscore-list')
    };

    /**
     * Updates the user inteface, given the current state of the highscores.
     *
     * @param {object} highscores the highscores
     */

    bindHighscores(highscores) {
        this.#elements.highscoreList.textContent = '';

        for (const highscore of highscores) {
            const highscoreElement = this.#buildRow(highscore);

            this.#elements.highscoreList.appendChild(highscoreElement);
        };
    }

    #buildColumn1(highscore) {
        const element = document.createElement('div');

        element.classList.add('col-sm-2');
        element.textContent = highscore.position ? `#${highscore.position}` : '';

        return element;
    }

    #buildColumn2(highscore) {
        const element = document.createElement('div');

        element.appendChild(this.#buildScoreIcon());
        element.appendChild(this.#buildSymbol());
        element.appendChild(this.#buildScore(highscore));
        element.classList.add('col-sm-3');

        return element;
    }

    #buildColumn3(highscore) {
        const element = document.createElement('div');

        element.classList.add('col-sm-7');
        element.textContent = `${highscore.name}`;

        return element;
    }

    #buildRow(highscore) {
        const element = document.createElement('div');

        element.classList.add('mb-2');
        element.classList.add('row');

        element.appendChild(this.#buildColumn1(highscore));
        element.appendChild(this.#buildColumn2(highscore));
        element.appendChild(this.#buildColumn3(highscore));

        return element;
    }

    #buildScore(highscore) {
        const element = document.createElement('span');

        element.classList.add('inventory');
        element.textContent = `${highscore.score}`;

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
};
