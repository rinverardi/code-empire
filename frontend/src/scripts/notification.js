import { Html } from './util.js';

export class NotificationHelper {
    #notifications = [];

    clear() {
        this.#notifications = [];

        for (const element of document.getElementsByClassName('notification')) {
            element.remove();
        }
    }

    #displayLater(message, style) {
        this.#notifications.push({ message, style });
    }

    #displayNow(message, style) {
        const element = document.createElement('div');

        element.classList.add('notification');
        element.classList.add(style);
        element.innerHTML = message;

        document.body.appendChild(element);

        setTimeout(() => {
            element.remove();

            if (this.#notifications.length > 0) {
                const notification = this.#notifications.shift();

                this.#show(notification.message, notification.style);
            }
        }, 3000);
    }

    #show(message, style) {
        if (document.getElementsByClassName('notification').length) {
            this.#displayLater(message, style);
        } else {
            this.#displayNow(message, style);
        }
    }

    showError(message) {
        this.#show(message, 'notification-error');
    }

    showInformation(message) {
        this.#show(message, 'notification-information');
    }

    showMessage(message) {
        this.#show(message, 'chat-bubble');
    }
}

export class NotificationView {
    #currentMessage = -1;
    #currentPlayer;
    #navigation;
    #notificationHelper;
    #playerHelper;
    #turnHelper;

    constructor(context) {
        this.#navigation = context.navigation();
        this.#notificationHelper = context.notificationHelper();
        this.#playerHelper = context.playerHelper();
        this.#turnHelper = context.turnHelper();
    }

    bindGame(game) {
        if (this.#currentPlayer !== game.turn.player) {
            this.#notificationHelper.clear();
        }

        this.#showCurrentPlayer(game);
        this.#showCurrentMessage(game);
    }

    #showCurrentMessage(game) {
        if (this.#currentMessage < game.messages.length - 1) {
            this.#currentMessage = game.messages.length - 1;

            if (!this.#navigation.isPopupOpen('chat')) {
                const message = game.messages[this.#currentMessage];
                const player = this.#playerHelper.getPlayer(game, message.player);
                const playerName = Html.escape(player.name);
                const messageText = Html.escape(message.text);

                this.#notificationHelper.showMessage(`${playerName}: ${messageText}`);
            }
        }
    }

    #showCurrentPlayer(game) {
        if (this.#currentPlayer !== game.turn.player) {
            this.#currentPlayer = game.turn.player;

            if (this.#playerHelper.isMe(game)) {
                this.#notificationHelper.showInformation('Du bist am Zug!');
            } else {
                const player = this.#turnHelper.getPlayer(game);
                const playerName = Html.escape(player.name);

                this.#notificationHelper.showInformation(`${playerName} ist am Zug.`);
            }
        }
    }
}
