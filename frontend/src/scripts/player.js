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
    #addPlayer(player) {
        const playerElement = document.createElement('img');

        playerElement.classList.add('player');
        playerElement.id = player.id;
        playerElement.src = 'images/player.svg';

        return playerElement;
    }

    bindGame(game) {
        const mapElement = document.getElementById('map');

        for (const player of game.players) {
            let playerElement = document.getElementById(player.id);

            if (player.status === Player.Status.alive) {
                if (!playerElement) {
                    playerElement = this.#addPlayer(player);

                    mapElement.appendChild(playerElement);
                }

                this.#updatePlayer(game, player, playerElement);
            } else if (playerElement) {
                playerElement.remove();
            }
        }
    }

    #updatePlayer(game, player, playerElement) {
        if (game.turn.player === player.id) {
            playerElement.classList.add('current');
        } else {
            playerElement.classList.remove('current');
        }

        playerElement.style.left = `${player.position[0] * 40 + 40}px`;
        playerElement.style.top = `${player.position[1] * 45 + 20}px`;
    }
};