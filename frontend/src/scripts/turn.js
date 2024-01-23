import { Context } from './context.js';
import { Structure } from './structure.js';

/**
 * This is not a data structure that represents a turn! Rather, it is a
 * container class for turn-related things.
 */

export class Turn {

    /**
     * Defines the turn types.
     */

    static get Type() {
        return Object.freeze({
            build: 'build',
        });
    }
};


/**
 * Provides turn-related helper methods.
 */

export class TurnHelper {

    /**
     * Returns the index of a turn.
     * <p>
     * If no turn with the given criteria exists, the returned value is -1.
     *
     * @param {object} game the game
     * @param {string} structure the desired type of structure
     * @param {string} type the desired type of turn
     * @returns {number} the turn index or -1
     */

    findTurn(game, structure, type) {
        const turns = game.turns ?? [];

        return turns.findIndex(that => that.structure === structure && that.type === type);
    }

    /**
     * Returns the current player.
     *
     * @param {object} game the game
     * @returns {object} the player
     */

    getPlayer(game) {
        const playerId = game.turn.player;

        for (const player of game.players) {
            if (player.id === playerId) {
                return player;
            }
        }
    }

    /**
     * Looks up a turn, given its position on the map.
     *
     * @param {number} x the x-coordinate of the position
     * @param {number} y the y-coordinate of the position
     * @returns {object} the turn
     */

    getTurn(game, x, y) {
        let turnCount = game.turns ? game.turns.length : 0;

        for (let turnIndex = 0; turnIndex < turnCount; turnIndex++) {
            let turn = game.turns[turnIndex];

            if (turn.positionTo && turn.positionTo[0] === x && turn.positionTo[1] === y) {
                return turnIndex;
            }
        }
    }
}

/**
 * Updates the turn-related portion of the user interface.
 */

export class TurnView {
    #playerHelper;
    #turnHelper;

    /**
     * Avoid calling this constructor directly! Instead, use the globally-scoped
     * object from the context.
     *
     * @param {Context} context holds the globally-scoped objects
     */

    constructor(context) {
        this.#playerHelper = context.playerHelper();
        this.#turnHelper = context.turnHelper();
    }

    /**
     * Updates the user inteface, given the current state of the game.
     *
     * @param {object} game the game
     */

    bindGame(game) {
        const positions = [];

        if (game.turns) {
            game.turns
                .filter(that => that.positionTo)
                .forEach(that => positions.push(that.positionTo));

            if (this.#playerHelper.isMe(game)) {
                const me = this.#playerHelper.getMe(game);

                positions.push(me.position);
            }

            this.#stylePlayers(positions);
            this.#styleResources(positions);
            this.#styleStructures(positions);
            this.#styleTiles(positions);
        } else {
            this.#reset();
        }

        this.#toggleButtons(game);
    }

    #reset() {
        document.querySelectorAll('.active').forEach(that => that.classList.remove('active'));
        document.querySelectorAll('.inactive').forEach(that => that.classList.remove('inactive'));
    }

    #stylePlayers(positions) {
        const playerElements = document.querySelectorAll('.player, .resources');

        for (const playerElement of playerElements) {
            const { x, y } = playerElement.dataset;

            if (positions.some(that => that[0] === parseInt(x) && that[1] === parseInt(y))) {
                playerElement.classList.add('active');
            } else {
                playerElement.classList.remove('active');
            }
        }
    }

    #styleResources(positions) {
        const resourceElements = document.querySelectorAll('.resource');

        for (const resourceElement of resourceElements) {
            const { x, y } = resourceElement.dataset;

            if (positions.some(that => that[0] === parseInt(x) && that[1] === parseInt(y))) {
                resourceElement.classList.add('active');
            } else {
                resourceElement.classList.remove('active');
            }
        }
    }

    #styleStructures(positions) {
        const structureElements = document.querySelectorAll('.structure');

        for (const structureElement of structureElements) {
            const { x, y } = structureElement.dataset;

            if (positions.some(that => that[0] === parseInt(x) && that[1] === parseInt(y))) {
                structureElement.classList.add('active');
            } else {
                structureElement.classList.remove('active');
            }
        }
    }

    #styleTiles(positions) {
        const tileElements = document.querySelectorAll('.tile');

        for (const tileElement of tileElements) {
            const { x, y } = tileElement.dataset;

            if (positions.some(that => that[0] === parseInt(x) && that[1] === parseInt(y))) {
                tileElement.classList.add('active');
                tileElement.classList.remove('inactive');
            } else {
                tileElement.classList.remove('active');
                tileElement.classList.add('inactive');
            }
        }
    }

    #toggleButtons(game) {
        const buttons = [
            {id: 'button-build-city', structure: Structure.Type.city},
            {id: 'button-build-factory', structure: Structure.Type.factory},
            {id: 'button-build-metropolis', structure: Structure.Type.metropolis},
            {id: 'button-build-village', structure: Structure.Type.village}
        ];

        for (const {id, structure} of buttons) {
            let turn = this.#turnHelper.findTurn(game, structure, Turn.Type.build);

            document.getElementById(id).disabled = turn < 0;
        }
    }
}
