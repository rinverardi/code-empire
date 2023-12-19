import { Config } from './config.js';

export class Communication {
    #connection;
    #gameHelper;
    #notificationHelper;
    #onMessage;
    #onOpen;
    #playerHelper;
    #url;

    constructor(context) {
        this.#gameHelper = context.gameHelper();
        this.#notificationHelper = context.notificationHelper();
        this.#playerHelper = context.playerHelper();
    }

    #connect() {
        this.#connection = new WebSocket(this.#url);

        this.#connection.onclose = () => this.#handleClose();
        this.#connection.onerror = () => this.#handleError();
        this.#connection.onmessage = message => this.#handleMessage(message);
        this.#connection.onopen = () => this.#handleOpen();
    }

    connectGame(onMessage, onOpen) {
        this.#onMessage = onMessage;
        this.#onOpen = onOpen;

        const parameters = [this.#gameHelper.loadId(), this.#playerHelper.loadId(), this.#playerHelper.loadSecret()];

        this.#url = Config.urlForGames + parameters.join('-');

        this.#connect();
    }

    connectGameList(onMessage, onOpen) {
        this.#onMessage = onMessage;
        this.#onOpen = onOpen;
        this.#url = Config.urlForGames;

        this.#connect();
    }

    #handleClose() {
        setTimeout(() => this.#notificationHelper.showError('Die Verbindung wurde getrennt!'), 2000);
    }

    #handleError() {
        this.#notificationHelper.showError('Die Verbindung ist fehlerhaft!');
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

    sendMessage(message) {
        const messageData = JSON.stringify(message);

        this.#connection.send(messageData);
    }
};
