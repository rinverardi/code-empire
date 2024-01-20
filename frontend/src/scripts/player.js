import { Context } from './context.js';
import { Transition } from './transition.js';

/**
 * This is not a data structure that represents a player! Rather, it is a
 * container class for player-related things.
 */

export class Player {

    /**
     * Defines the player attributes used in conjunction with the session
     * storage.
     */

    static get Attribute() {
        return Object.freeze({
            id: 'playerId',
            name: 'playerName',
            secret: 'playerSecret'
        });
    }

    /**
     * Defines the player roles.
     */

    static get Role() {
        return Object.freeze({
            master: 'master'
        });
    }

    /**
     * Defines the player statuses.
     */

    static get Status() {
        return Object.freeze({
            alive: 'alive',
            dead: 'dead'
        });
    }

    /**
     * Looks up an HTML element, given a player.
     *
     * @param {object} player the player
     * @returns {object} the HTML element
     */

    static element(player) {
        return document.getElementById(Player.elementId(player));
    }

    /**
     * Looks up an HTML element ID, given a player.
     *
     * @param {object} player the player
     * @returns {object} the HTML element
     */

    static elementId(player) {
        return `player-${player.id}`;
    }
};

/**
 * Provides player-related helper methods.
 */

export class PlayerHelper {
    #random;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the context.
     *
     * @param {Context} context holds the globally-scoped objects
     */

    constructor(context) {
        this.#random = context.random();
    }

    /**
     * Returns the local player.
     *
     * @param {object} game the game
     * @returns {object} the player
     */

    getMe(game) {
        const playerId = this.loadId();

        return this.getPlayer(game, playerId);
    }

    /**
     * Looks up a player, given its player ID.
     *
     * @param {object} game the game
     * @param {string} playerId the player ID
     * @returns {object} the player
     */

    getPlayer(game, playerId) {
        for (const player of game.players ?? []) {
            if (player.id === playerId) {
                return player;
            }
        }
    }

    /**
     * Checks if the local player is the current player.
     *
     * @param {object} game the game
     * @returns {boolean} whether or not the local player is the current player
     */

    isMe(game) {
        const playerId = this.loadId();

        return game.turn.player === playerId;
    }

    /**
     * Loads the player ID from the session storage.
     * <p>
     * If the session storage does not contain a player ID, a new player ID is
     * generated and stored.
     *
     * @returns {string} the player ID
     */

    loadId() {
        let id = window.sessionStorage.getItem(Player.Attribute.id);

        if (!id) {
            this.saveId(id = this.#random.generateId());
        }

        return id;
    }

    /**
     * Loads the player name from the session storage.
     * <p>
     * If the session storage does not contain a player name, a random player
     * name is generated and stored.
     *
     * @returns {string} the player name
     */

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


    /**
     * Saves the player ID in the sesssion storage.
     *
     * @param {string} id the player ID
     */

    saveId(id) {
        window.sessionStorage.setItem(Player.Attribute.id, id);
    }

    /**
     * Saves the player name in the session storage.
     *
     * @param {string} name the player name
     */

    saveName(name) {
        window.sessionStorage.setItem(Player.Attribute.name, name);
    }

    /**
     * Saves the player secret in the session storage.
     *
     * @param {string} secret the player secret
     */

    saveSecret(secret) {
        window.sessionStorage.setItem(Player.Attribute.secret, secret);
    }
};

/**
 * Updates the player-related portion of the user interface.
 */

export class PlayerView {
    #elements = {
        mapContainer: document.getElementById('map-container'),
        playerLayer: document.getElementById('player-layer')
    };

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
