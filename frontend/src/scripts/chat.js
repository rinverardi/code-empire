export class ChatView {
    #elements = {
        chat: document.getElementById('chat'),
        chatList: document.getElementById('chat-list')
    }

    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
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
};
