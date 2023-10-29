import { Config } from './config.js';

export class Communication {
    #connection;
    #onMessage;
    #onOpen;
    #player;
    #url;

    constructor(context) {
        this.#player = context.player();
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

        const parameters = [location.hash.slice(1), this.#player.loadId(), this.#player.loadSecret()];

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
        setTimeout(() => location = 'on_disconnect.html', 2000);
    }

    #handleError() {
        location = 'on_error.html';
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