import { Context } from './context.js';
import { Html } from './util.js';

/**
 * This is not a data structure that represents a notification! Rather, it is a
 * container class for notification-related things.
 */

export class Notification {

    /**
     * Defines the notification types.
     */

    static get Type() {
        return Object.freeze({
            attack: 'attack',
            kill: 'kill'
        });
    }
}

/**
 * Provides notification-related helper methods.
 */

export class NotificationHelper {
    #notifications = [];

    /**
     * Removes all notifications.
     */

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

    /**
     * Shows a notification for an error event.
     *
     * @param {string} message the error message
     */

    showError(message) {
        this.#show(message, 'notification-error');
    }

    /**
     * Shows a notification for an information event.
     *
     * @param {string} message the information message
     */

    showInformation(message) {
        this.#show(message, 'notification-information');
    }

    /**
     * Shows a notification for a chat message.
     *
     * @param {string} message the chat message
     */

    showMessage(message) {
        this.#show(message, 'chat-bubble');
    }
}

/**
 * Updates the notification-related portion of the user interface.
 */

export class NotificationView {
    #currentMessage = -1;
    #currentPlayer;
    #navigation;
    #notificationHelper;
    #playerHelper;
    #translation;
    #turnHelper;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the context.
     *
     * @param {Context} context holds the globally-scoped objects
     */

    constructor(context) {
        this.#navigation = context.navigation();
        this.#notificationHelper = context.notificationHelper();
        this.#playerHelper = context.playerHelper();
        this.#translation = context.translation();
        this.#turnHelper = context.turnHelper();
    }

    /**
     * Updates the user inteface, given the current state of the game.
     *
     * @param {object} game the game
     */

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
                message = this.#translation.notification(
                    'youAttack',
                    [Html.escape(victim.name), Html.escape(victim.health)]);
                break;

            case victim.id:
                message = this.#translation.notification(
                    'someoneAttacksYou',
                    [Html.escape(attacker.name), Html.escape(victim.health)]);
                break;

            default:
                message = this.#translation.notification(
                    'someoneAttacksSomeone',
                    [Html.escape(attacker.name), Html.escape(victim.name), Html.escape(victim.health)]);
                break;
        }

        this.#notificationHelper.showInformation(message);
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
                const notification = this.#translation.notification('youThink');

                this.#notificationHelper.showInformation(notification);
            } else {
                const player = this.#turnHelper.getPlayer(game);
                const playerName = Html.escape(player.name);

                const notification = this.#translation.notification('someoneThinks', [playerName]);

                this.#notificationHelper.showInformation(notification);
            }
        }
    }

    #showKill(game, notification) {
        const attacker = this.#playerHelper.getPlayer(game, notification.attacker);
        const victim = this.#playerHelper.getPlayer(game, notification.victim);

        var message;

        switch (this.#playerHelper.loadId()) {
            case attacker.id:
                message = this.#translation.notification(
                    'youKill',
                    [Html.escape(victim.name)]);
                break;

            case victim.id:
                message = this.#translation.notification(
                    'someoneKillsYou',
                    [Html.escape(attacker.name)]);
                break;

            default:
                message = this.#translation.notification(
                    'someoneKillsSomeone',
                    [Html.escape(attacker.name), Html.escape(victim.name)]);
                break;
        }

        this.#notificationHelper.showInformation(message);
    }
}
