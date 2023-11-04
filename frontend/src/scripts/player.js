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
            left: 'left'
        });
    }
};

export class PlayerHelper {
    #random;

    constructor(context) {
        this.#random = context.random();
    }

    getPlayer(game) {
        const playerId = this.loadId();

        if (game.players) {
            for (const player of game.players) {
                if (player.id === playerId) {
                    return player;
                }
            }
        }
    }

    isCurrentPlayer(game) {
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
    #addPlayers(game) {
        const mapElement = document.getElementById('map');

        for (const player of game.players) {
            const playerElement = this.#buildPlayer(player);

            if (player.id === game.turn.player) {
                playerElement.classList.add('current');
            }

            mapElement.appendChild(playerElement);
        }
    }

    applyGame(game) {
        this.#removePlayers(game);
        this.#addPlayers(game);
    }

    #buildPlayer(player) {
        const playerElement = document.createElement('img');

        playerElement.classList.add('player');

        playerElement.src = 'images/player.svg';

        playerElement.style.left = `${player.position[0] * 40 + 40}px`;
        playerElement.style.top = `${player.position[1] * 45 + 20}px`;

        return playerElement;
    }

    #removePlayers(game) {
        const playerElements = document.getElementsByClassName('player');

        for (const playerElement of [...playerElements]) {
            playerElement.remove();
        }
    }
};