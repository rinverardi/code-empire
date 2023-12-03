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
            left: 'left'
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
        return this.getPlayer(game, this.loadId());
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
        for (const player of game.players) {
            let playerElement = Player.element(player);

            if (player.status === Player.Status.alive) {
                if (!playerElement) {
                    playerElement = this.#build(player);

                    this.#elements.playerLayer.appendChild(playerElement);
                }

                this.#update(game, player, playerElement);
            } else if (playerElement) {
                playerElement.remove();
            }
        }
    }

    #build(player) {
        const playerElement = document.createElement('img');

        playerElement.classList.add('player');
        playerElement.id = Player.elementId(player);
        playerElement.src = 'images/player.svg';

        return playerElement;
    }

    #update(game, player, playerElement) {
        const x = player.position[0] * 40;
        const y = player.position[1] * 45 - 15;

        playerElement.dataset.x = player.position[0];
        playerElement.dataset.y = player.position[1];
        playerElement.style.left = `${x}px`;
        playerElement.style.top = `${y}px`;

        if (game.turn.player === player.id) {
            playerElement.classList.add('current');

            if (this.#playerHelper.isMe(game)) {
                this.#elements.mapContainer.scroll(
                    x - this.#elements.mapContainer.clientWidth / 2 + 40,
                    y - this.#elements.mapContainer.clientHeight / 2 + 40);
            }
        } else {
            playerElement.classList.remove('current');
        }
    }
};