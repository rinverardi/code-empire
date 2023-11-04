export class MapView {
    #addActions(game) {
        for (const action of game.turn.actions) {
            const mapElement = this.#getMapTile(action.positionTo[0], action.positionTo[1]);

            mapElement.classList.add('active');
        }

        const tileElements = document.getElementsByClassName('tile');

        for (const tileElement of tileElements) {
            if (![...tileElement.classList].includes('active')) {
                tileElement.classList.add('inactive');
            }
        }
    }

    applyGame(game) {
        let mapElement = document.getElementById('map');

        if (!mapElement) {
            mapElement = this.#buildMap(game.map.tiles);

            document.getElementById('map-container').appendChild(mapElement);
        }

        this.#removeActions(game);

        if (game.turn.actions) {
            this.#addActions(game);
        }
    }

    #buildMap(tiles) {
        const mapElement = document.createElement('div');

        mapElement.id = 'map';

        for (let y = 0; y < tiles.length; y++) {
            const rowElement = this.#buildMapRow();

            for (let x = 0; x < tiles[y].length; x++) {
                if (tiles[y][x] !== ' ') {
                    const tileElement = this.#buildMapTile(tiles, x, y);

                    rowElement.appendChild(tileElement);
                }
            }

            mapElement.appendChild(rowElement);
        }

        return mapElement;
    }

    #buildMapRow() {
        const rowElement = document.createElement('div');

        rowElement.classList = ['map-row'];

        return rowElement;
    }

    #buildMapTile(tiles, x, y) {
        const tileElement = document.createElement('div');

        tileElement.classList = tiles === '-' ? ['tile'] : ['tile tile-' + tiles[y][x]];
        tileElement.dataset.x = x;
        tileElement.dataset.y = y;

        return tileElement;
    }

    #getMapTile(x, y) {
        const tileElements = document.getElementsByClassName('tile');

        for (const tileElement of tileElements) {
            if (parseInt(tileElement.dataset.x) === x && parseInt(tileElement.dataset.y) === y) {
                return tileElement;
            }
        }

        throw new RangeError('No such tile');
    }

    #removeActions(game) {
        const tileElements = document.getElementsByClassName('tile');

        for (const tileElement of tileElements) {
            tileElement.classList.remove('active');
            tileElement.classList.remove('inactive');
        }
    }
};