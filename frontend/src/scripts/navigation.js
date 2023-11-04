import { Player } from './player.js';

export class Navigation {
    #gameHelper;
    #playerHelper;

    constructor(context) {
        this.#gameHelper = context.gameHelper();
        this.#playerHelper = context.playerHelper();
    }

    closePopup(popup, onClosed) {
        const element = document.getElementById(popup);

        element.classList.remove('open');

        setTimeout(() => {
            element.style.visibility = 'hidden';

            onClosed();
        }, 500);
    }

    continuePlaying() {
        location = 'map.html';
    }

    continueWaiting(game) {
        const player = this.#playerHelper.getPlayer(game);

        if (player) {
            location = player.role === Player.Role.master ? 'create_game_2.html' : 'join_game_2.html';
        } else {
            this.startOver();
        }
    }

    startOver() {
        this.#gameHelper.removeId();

        location = 'index.html';
    }

    wireClick(control, handler) {
        document.getElementById(control).addEventListener('click', () => {
            const location = handler();

            if (location) {
                window.location = location;
            }
        });
    }

    wirePopup(controlOpen, controlClose, popup) {
        document.getElementById(controlOpen).addEventListener('click', () => {
            const element = document.getElementById(popup);

            element.classList.add('open');
            element.style.visibility = 'visible';
        });

        document.getElementById(controlClose).addEventListener('click', () => {
            const element = document.getElementById(popup);

            element.classList.remove('open');

            setTimeout(() => element.style.visibility = 'hidden', 500);
        });
    }
};