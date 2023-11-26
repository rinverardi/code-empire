export class ChatView {
    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    #buildBubble(message, player) {
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

        element.appendChild(this.#buildBubble(message, player));
        element.classList.add('col-12');

        return element;
    }

    #buildRow(message, player) {
        const element = document.createElement('div');

        element.appendChild(this.#buildColumn(message, player));
        element.classList.add('mb-2');
        element.classList.add('row');

        return element;
    }

    bindGame(game) {
        const listElement = document.getElementById('chat-list');

        for (let index = listElement.childElementCount; index < game.messages.length; index++) {
            const message = game.messages[index];
            const player = this.#playerHelper.getPlayer(game, message.player);

            listElement.appendChild(this.#buildRow(message, player));
        }

        const chatElement = document.getElementById('chat');

        chatElement.scrollTo({
            top: chatElement.scrollHeight
        });
    }
};
