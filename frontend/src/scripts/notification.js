import { Html } from './util.js';

export class Notification {
    static get Type() {
        return Object.freeze({
            attack: 'attack',
            kill: 'kill'
        });
    }
}

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

        for (const notification of game.notifications) {
            switch (notification.type) {
                case Notification.Type.attack:
                    this.#showAttack(game, notification);
                    break;

                case Notification.Type.kill:
                    this.#showKill(game, notification);
                    break;

                default:
                    throw new RangeError('No such notification');
            }
        }

        this.#showCurrentPlayer(game);
        this.#showCurrentMessage(game);
    }

    #showAttack(game, notification) {
        const attacker = this.#playerHelper.getPlayer(game, notification.attacker);
        const victim = this.#playerHelper.getPlayer(game, notification.victim);

        var message;

        switch (this.#playerHelper.loadId()) {
            case attacker.id:
                message = `Du attackierst ${Html.escape(victim.name)}.`;
                break;

            case victim.id:
                message = `${Html.escape(attacker.name)} attackiert dich!`;
                break;

            default:
                message = `${Html.escape(attacker.name)} attackiert ${Html.escape(victim.name)}.`;
                break;
        }

        this.#notificationHelper.showInformation(`${message}<br>(noch ${Html.escape(victim.health)} Trefferpunkte)`);
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

    #showKill(game, notification) {
        const attacker = this.#playerHelper.getPlayer(game, notification.attacker);
        const victim = this.#playerHelper.getPlayer(game, notification.victim);

        var message;

        switch (this.#playerHelper.loadId()) {
            case attacker.id:
                message = `Du hast ${Html.escape(victim.name)} eliminiert.`;
                break;

            case victim.id:
                message = `${Html.escape(attacker.name)} hat dich eliminiert!`;
                break;

            default:
                message = `${Html.escape(attacker.name)} hat ${Html.escape(victim.name)} eliminiert.`;
                break;
        }

        this.#notificationHelper.showInformation(message);
    }
}
