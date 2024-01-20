import { Context } from './context.js';
import { Player } from './player.js';

/**
 * Provides navigation-related helper methods.
 */

export class Navigation {
    #gameHelper;
    #playerHelper;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the context.
     *
     * @param {Context} context holds the globally-scoped objects
     */

    constructor(context) {
        this.#gameHelper = context.gameHelper();
        this.#playerHelper = context.playerHelper();
    }

    /**
     * Closes a popup.
     *
     * @param {string} popup the element ID of the popup
     * @param {function} onClosed invoked after the popup is closed
     */

    closePopup(popup, onClosed) {
        const element = document.getElementById(popup);

        element.classList.remove('open');

        setTimeout(() => {
            element.style.visibility = 'hidden';

            onClosed();
        }, 500);
    }

    /**
     * Navigates to the map screen.
     */

    continuePlaying() {
        location = 'map.html';
    }

    /**
     * Navigates to the final screen before the game starts.
     *
     * @param {object} game the game
     */

    continueWaiting(game) {
        const me = this.#playerHelper.getMe(game);

        if (me) {
            location = me.role === Player.Role.master ? 'create_game_2.html' : 'join_game_2.html';
        } else {
            this.startOver();
        }
    }

    /**
     * Navigates to the final screen after the game ends, also known as the
     * game over screen.
     */

    gameOver() {
        location = 'game_over.html';
    }

    /**
     * Checks if a popup is open.
     *
     * @param {string} popup the element ID of the popup
     * @returns {boolean} whether or not the popup is open
     */

    isPopupOpen(popup) {
        const element = document.getElementById(popup);

        return element.classList.contains('open');
    }

    /**
     * Navigates to the initial screen.
     */

    startOver() {
        this.#gameHelper.removeId();

        location = 'index.html';
    }

    /**
     * Wires a clickable element by installing its event handler.
     *
     * @param {string} id the element ID
     * @param {function} onClick invoked when the element is clicked
     */

    wireClick({ id, onClick }) {
        document.getElementById(id).addEventListener('click', () => {
            const location = onClick();

            if (location) {
                window.location = location;
            }
        });
    }

    /**
     * Wires a popup element by installing its event handlers.
     *
     * @param {string} id the element ID
     * @param {function} onClick invoked when the element is clicked
     */

    wirePopup({ controlClose, controlOpen, id, onOpen }) {
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
