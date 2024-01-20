import { Context } from './context.js';

/**
 * Updates the chat-related portion of the user interface.
 */

export class ChatView {
    #elements = {
        chat: document.getElementById('chat'),
        chatList: document.getElementById('chat-list')
    }

    #playerHelper;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the context.
     *
     * @param {Context} context holds the globally-scoped objects
     */

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    /**
     * Updates the user inteface, given the current state of the game.
     *
     * @param {object} game the game
     */

    bindGame(game) {
        for (let index = this.#elements.chatList.childElementCount; index < game.messages.length; index++) {
            const message = game.messages[index];
            const player = this.#playerHelper.getPlayer(game, message.player);

            this.#elements.chatList.appendChild(this.#buildRow(message, player));
        }

        this.#elements.chat.scrollTo({
            top: this.#elements.chat.scrollHeight
        });
    }

    #build(message, player) {
        const outerElement = document.createElement('div');

        outerElement.classList.add('chat-bubble');

        [player.name, message.text].forEach(that => {
            const innerElement = document.createElement('div');

            innerElement.textContent = that;

            outerElement.appendChild(innerElement);
        });

        return outerElement;
    }

    #buildColumn(message, player) {
        const element = document.createElement('div');

        element.classList.add('col-12');

        element.appendChild(this.#build(message, player));

        return element;
    }

    #buildRow(message, player) {
        const element = document.createElement('div');

        element.classList.add('mb-2');
        element.classList.add('row');

        element.appendChild(this.#buildColumn(message, player));

        return element;
    }
};
