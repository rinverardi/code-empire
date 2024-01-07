import { Transition } from './transition.js';

export class Player {
    static get Attribute() {
        return Object.freeze({
            id: 'playerId',
            name: 'playerName',
            secret: 'playerSecret'
        });
    }

    static get Role() {
        return Object.freeze({
            master: 'master'
        });
    }

    static get Status() {
        return Object.freeze({
            alive: 'alive',
            dead: 'dead'
        });
    }

    static element(player) {
        return document.getElementById(Player.elementId(player));
    }

    static elementId(player) {
        return `player-${player.id}`;
    }
};

export class PlayerHelper {
    #random;

    constructor(context) {
        this.#random = context.random();
    }

    getMe(game) {
        const playerId = this.loadId();

        return this.getPlayer(game, playerId);
    }

    getPlayer(game, playerId) {
        for (const player of game.players ?? []) {
            if (player.id === playerId) {
                return player;
            }
        }
    }

    isMe(game) {
        const playerId = this.loadId();

        return game.turn.player === playerId;
    }

    loadId() {
        let id = window.sessionStorage.getItem(Player.Attribute.id);

        if (!id) {
            this.saveId(id = this.#random.generateId());
        }

        return id;
    }

    loadName() {
        let name = window.sessionStorage.getItem(Player.Attribute.name);

        if (!name) {
            this.saveName(name = `${this.#random.pickAdjective()} ${this.#random.pickAnimal()}`);
        }

        return name;
    }

    loadSecret() {
        let secret = window.sessionStorage.getItem(Player.Attribute.secret);

        if (!secret) {
            this.saveSecret(secret = this.#random.generateSecret());
        }

        return secret;
    }

    saveId(id) {
        window.sessionStorage.setItem(Player.Attribute.id, id);
    }

    saveName(name) {
        window.sessionStorage.setItem(Player.Attribute.name, name);
    }

    saveSecret(secret) {
        window.sessionStorage.setItem(Player.Attribute.secret, secret);
    }
};

export class PlayerView {
    #elements = {
        mapContainer: document.getElementById('map-container'),
        playerLayer: document.getElementById('player-layer')
    };

    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    bindGame(game) {
        const me = this.#playerHelper.isMe(game);

        for (const player of game.players) {
            let playerElement = Player.element(player);

            if ([Player.Status.alive, Player.Status.dead].includes(player.status)) {
                if (!playerElement) {
                    playerElement = this.#build(player);

                    this.#elements.playerLayer.appendChild(playerElement);

                    this.#scroll(game, false);
                }

                this.#update(game, me, player, playerElement);
            } else if (playerElement) {
                playerElement.remove();
            }
        }

        if (me) {
            this.#scroll(game, true);
        }
    }

    #build(player) {
        const playerElement = document.createElement('img');

        playerElement.classList.add('obscured');
        playerElement.classList.add('player');
        playerElement.id = Player.elementId(player);
        playerElement.src = 'images/player.svg';

        return playerElement;
    }

    #move(element, x, y) {
        const obscured = element.classList.contains('obscured');

        if (obscured) {
            Transition.disableFor(element);
        }

        element.style.left = `${this.#positionX(x)}px`;
        element.style.top = `${this.#positionY(y)}px`;

        if (obscured) {
            Transition.enableFor(element);
        }
    }

    #positionX(x) {
        return x * 40;
    }

    #positionY(y) {
        return y * 45 - 15;
    }

    #scroll(game, smooth) {
        const [x, y] = this.#playerHelper.getMe(game).position;

        this.#elements.mapContainer.scroll({
            behavior: smooth ? 'smooth' : 'instant',
            left: this.#positionX(x) - this.#elements.mapContainer.clientWidth / 2 + 40,
            top: this.#positionY(y) - this.#elements.mapContainer.clientHeight / 2 + 40
        });
    }

    #update(game, me, player, playerElement) {
        if (player.position) {
            const [x, y] = player.position;

            this.#move(playerElement, x, y);

            playerElement.dataset.x = player.position[0];
            playerElement.dataset.y = player.position[1];

            if (me && game.turn.player == player.id) {
                playerElement.classList.add('current');
            } else {
                playerElement.classList.remove('current');
            }
        }

        if (player.position && player.status === Player.Status.alive) {
            playerElement.classList.remove('obscured');
        } else {
            playerElement.classList.add('obscured');
        }
}
};
