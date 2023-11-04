export class MapView {
    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    bindGame(game) {
        let mapElement = document.getElementById('map');

        if (!mapElement) {
            mapElement = this.#buildMap(game.map.tiles);

            document.getElementById('map-container').appendChild(mapElement);
        }

        this.#unmarkTiles(game);

        if (game.turns) {
            this.#markTilesAsActive(game);
            this.#markTilesAsCurrent(game);
            this.#markTilesAsInactive(game);
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

    #markTilesAsActive(game) {
        for (const turn of game.turns) {
            const mapElement = this.#getMapTile(...turn.positionTo);

            mapElement.classList.add('active');
        }
    }

    #markTilesAsCurrent(game) {
        if (this.#playerHelper.isCurrentPlayer(game)) {
            const player = this.#playerHelper.getPlayer(game);

            const tileElement = this.#getMapTile(...player.position);

            tileElement.classList.add('current');
        }
    }

    #markTilesAsInactive() {
        const tileElements = document.querySelectorAll('.tile:not(.active):not(.current)');

        tileElements.forEach(that => that.classList.add('inactive'));
    }

    #unmarkTiles(game) {
        const tileElements = document.getElementsByClassName('tile');

        for (const tileElement of tileElements) {
            ['active', 'current', 'inactive'].forEach(that => tileElement.classList.remove(that));
        }
    }
};
