import { Game } from '../game/game.js';
import { Player } from '../player/player.js';

export class Authz {
    #ok = new AuthzResult(true);

    canAbortGame(game, player) {
        return this.#checkGame({ game, status: Game.Status.waiting })
            ?? this.#checkPlayer({ player, role: Player.Role.master })
            ?? this.#ok;
    }

    canExecuteTurn(game, player) {
        return this.#checkGame({ game, status: Game.Status.running })
            ?? this.#checkPlayer({ player, status: Player.Status.alive })
            ?? this.#checkTurn({ game, player })
            ?? this.#ok;
    }

    canForfeitGame(game) {
        return this.#checkGame({ game, status: Game.Status.running })
            ?? this.#ok;
    }

    canJoinGame(game, player) {
        return this.#checkGame({ game, status: Game.Status.waiting })
            ?? this.#checkPlayerName({ game, player })
            ?? this.#ok;
    }

    canLeaveGame(game) {
        return this.#checkGame({ game, status: Game.Status.waiting })
            ?? this.#ok;
    }

    canSendMessage(game, player) {
        return this.#checkGame({ game, status: Game.Status.running })
            ?? this.#checkPlayer({ player, status: Player.Status.alive })
            ?? this.#ok;
    }

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

    orThrow() {
        if (!this.#decision) {
            throw new AuthzError(this.#message);
        }
    }
}
