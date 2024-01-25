import { Config } from './config.js';
import { Context } from './context.js';

/**
 * Manages a WebSocket connection, allowing for the reception of messages from
 * the backend and the transmission of messages to the backend.
 */

export class Communication {
    #connection;
    #gameHelper;
    #notificationHelper;
    #onMessage;
    #onOpen;
    #playerHelper;
    #translation;
    #url;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the context.
     *
     * @param {Context} context holds the globally-scoped objects
     */

    constructor(context) {
        this.#gameHelper = context.gameHelper();
        this.#notificationHelper = context.notificationHelper();
        this.#playerHelper = context.playerHelper();
        this.#translation = context.translation();
    }

    #connect() {
        this.#connection = new WebSocket(this.#url);

        this.#connection.onclose = () => this.#handleClose();
        this.#connection.onerror = () => this.#handleError();
        this.#connection.onmessage = message => this.#handleMessage(message);
        this.#connection.onopen = () => this.#handleOpen();
    }

    /**
     * Connects to the current game as the current player.
     * <ul>
     *   <li>The current game is identified by the game ID.
     *   <li>The current player is identified by the player ID.
     *   <li>The player secret is used for authentication.
     * </ul>
     * All of these values are retrieved from the session storage of the browser.
     *
     * @param {function} onMessage invoked when a message is received
     * @param {function} onOpen invoked once the connection is established
     */

    connectGame(onMessage, onOpen) {
        this.#onMessage = onMessage;
        this.#onOpen = onOpen;

        const parameters = [this.#gameHelper.loadId(), this.#playerHelper.loadId(), this.#playerHelper.loadSecret()];

        this.#url = Config.urlForGames + parameters.join('-');

        this.#connect();
    }

    /**
     * Opens a connection to the backend, asking for game updates.
     *
     * @param {function} onMessage invoked when a message is received
     * @param {function} onOpen invoked once the connection is established
     */

    connectGameList(onMessage, onOpen) {
        this.#onMessage = onMessage;
        this.#onOpen = onOpen;
        this.#url = Config.urlForGames;

        this.#connect();
    }

    /**
     * Opens a connection to the backend, asking for highscore updates.
     *
     * @param {function} onMessage invoked when a message is received
     * @param {function} onOpen invoked once the connection is established
     */

    connectHighscores(onMessage, onOpen) {
        this.#onMessage = onMessage;
        this.#onOpen = onOpen;
        this.#url = Config.urlForHighscores;

        this.#connect();
    }

    #handleClose() {
        const notification = this.#translation.notification('connectionClosed');

        setTimeout(() => this.#notificationHelper.showError(notification));
    }

    #handleError() {
        const notification = this.#translation.notification('connectionFailed');

        this.#notificationHelper.showError(notification);
    }

    #handleMessage(message) {
        const messageData = JSON.parse(message.data);

        if (this.#onMessage) {
            this.#onMessage(messageData);
        }
    }

    #handleOpen() {
        if (this.#onOpen) {
            this.#onOpen();
        }
    }

    /**
     * Sends a message using the current connection.
     *
     * @param {object} message the message to send
     */

    sendMessage(message) {
        const messageData = JSON.stringify(message);

        this.#connection.send(messageData);
    }
};
