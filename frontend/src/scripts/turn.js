import { Structure } from './structure.js';

export class Turn {
    static get Type() {
        return Object.freeze({
            build: 'build',
        });
    }
};

export class TurnHelper {
    canBuild(game, structure) {
        return game.turns.some(that => that.structure == structure && that.type === Turn.Type.build);
    }

    getPlayer(game) {
        const playerId = game.turn.player;

        for (const player of game.players) {
            if (player.id === playerId) {
                return player;
            }
        }
    }

    getTurn(game, x, y) {
        for (const turn of game.turns || []) {
            if (turn.positionTo && turn.positionTo[0] === x && turn.positionTo[1] === y) {
                return turn;
            }
        }
    }
}

export class TurnView {
    #playerHelper;
    #turnHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
        this.#turnHelper = context.turnHelper();
    }

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

            this.#toggleButtons(game);
        } else {
            this.#reset();
        }
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
            document.getElementById(id).disabled = !this.#turnHelper.canBuild(game, structure);
        }
    }
}
