import { Game } from '../game/game.js';
import { Player } from '../player/player.js';

/**
 * Provides methods for authorizing actions.
 */

export class Authz {
    #ok = new AuthzResult(true);

    /**
     * Checks if a player is authorized to abort a game.
     *
     * @param {object} game the game state
     * @param {object} player the player attempting to abort the game
     * @returns {AuthzResult} whether or not the action is authorized
     */

    canAbortGame(game, player) {
        return this.#checkGame({ game, status: Game.Status.waiting })
            ?? this.#checkPlayer({ player, role: Player.Role.master })
            ?? this.#ok;
    }

    /**
     * Checks if a player is authorized to execute a turn.
     *
     * @param {object} game the game state
     * @param {object} player the player attempting to execute a turn
     * @returns {AuthzResult} whether or not the action is authorized
     */

    canExecuteTurn(game, player) {
        return this.#checkGame({ game, status: Game.Status.running })
            ?? this.#checkPlayer({ player, status: Player.Status.alive })
            ?? this.#checkTurn({ game, player })
            ?? this.#ok;
    }

    /**
     * Checks if a player is authorized to forfeit a game.
     *
     * @param {object} game the game state
     * @param {object} player the player attempting to forfeit the game
     * @returns {AuthzResult} whether or not the action is authorized
     */

    canForfeitGame(game) {
        return this.#checkGame({ game, status: Game.Status.running })
            ?? this.#ok;
    }

    /**
     * Checks if a player is authorized to join a game.
     *
     * @param {object} game the game state
     * @param {object} player the player attempting to join the game
     * @returns {AuthzResult} whether or not the action is authorized
     */

    canJoinGame(game, player) {
        return this.#checkGame({ game, status: Game.Status.waiting })
            ?? this.#checkPlayerName({ game, player })
            ?? this.#ok;
    }

    /**
     * Checks if a player is authorized to leave a game.
     *
     * @param {object} game the game state
     * @param {object} player the player attempting to leave the game
     * @returns {AuthzResult} whether or not the action is authorized
     */

    canLeaveGame(game) {
        return this.#checkGame({ game, status: Game.Status.waiting })
            ?? this.#ok;
    }

    /**
     * Checks if a player is authorized to send a chat message.
     *
     * @param {object} game the game state
     * @param {object} player the player attempting to send a chat message
     * @returns {AuthzResult} whether or not the action is authorized
     */

    canSendMessage(game, player) {
        return this.#checkGame({ game, status: Game.Status.running })
            ?? this.#checkPlayer({ player, status: Player.Status.alive })
            ?? this.#ok;
    }

    /**
     * Checks if a player is authorized to start a game.
     *
     * @param {object} game the game state
     * @param {object} player the player attempting to start the game
     * @returns {AuthzResult} whether or not the action is authorized
     */

    canStartGame(game, player) {
        return this.#checkGame({ game, status: Game.Status.waiting })
            ?? this.#checkPlayer({ player, role: Player.Role.master })
            ?? this.#ok;
    }

    #checkGame({ game, status }) {
        if (status && game.status !== status) {
            return new AuthzResult(false, 'Wrong game status');
        }
    }

    #checkPlayer({ player, role, status }) {
        if (role && player.role !== role) {
            return new AuthzResult(false, 'Wrong player role');
        }

        if (status && player.status !== status) {
            return new AuthzResult(false, 'Wrong player status');
        }
    }

    #checkPlayerName({ game, player }) {
        const players = game.players
            .filter(that => that.id !== player.id)
            .filter(that => that.name === player.name)
            .filter(that => that.status === Player.Status.alive);

        if (players.length) {
            return new AuthzResult(false, 'Conflicting player name');
        }
    }

    #checkTurn({ game, player }) {
        if (game.turn.player !== player.id) {
            return new AuthzResult(false, 'Wrong player');
        }
    }
}

export class AuthzError extends Error {
    constructor(message) {
        super(message);

        this.name = 'AuthzError';
    }
}

export class AuthzResult {
    #decision;
    #message;

    constructor(decision, message) {
        this.#decision = decision;
        this.#message = message;
    }

    /**
     * Throws an exception unless the authorization result is positive.
     *
     * @throws {AuthzError} if the authorization result is negative
     */

    orThrow() {
        if (!this.#decision) {
            throw new AuthzError(this.#message);
        }
    }
}
