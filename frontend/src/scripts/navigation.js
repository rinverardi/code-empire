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
        const me = this.#playerHelper.getMe(game);

        if (me) {
            location = me.role === Player.Role.master ? 'create_game_2.html' : 'join_game_2.html';
        } else {
            this.startOver();
        }
    }

    isPopupOpen(popup) {
        const element = document.getElementById(popup);

        return element.classList.contains('open');
    }

    startOver() {
        this.#gameHelper.removeId();

        location = 'index.html';
    }

    wireClick({id, onClick}) {
        document.getElementById(id).addEventListener('click', () => {
            const location = onClick();

            if (location) {
                window.location = location;
            }
        });
    }

    wirePopup({controlClose, controlOpen, id, onOpen}) {
        document.getElementById(controlOpen).addEventListener('click', () => {
            onOpen && onOpen();

            const element = document.getElementById(id);

            element.classList.add('open');
            element.style.visibility = 'visible';
        });

        document.getElementById(controlClose).addEventListener('click', () => {
            const element = document.getElementById(id);

            element.classList.remove('open');

            setTimeout(() => element.style.visibility = 'hidden', 500);
        });
    }
};