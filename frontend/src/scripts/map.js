export class MapView {
    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    #addMap(tiles) {
        const mapElement = document.createElement('div');

        mapElement.id = 'map';

        for (let y = 0; y < tiles.length; y++) {
            const rowElement = this.#addMapRow();

            for (let x = 0; x < tiles[y].length; x++) {
                const tile = tiles[y][x];

                if (tile !== ' ') {
                    const tileElement = this.#addMapTile(tile, x, y);

                    rowElement.appendChild(tileElement);
                }
            }

            mapElement.appendChild(rowElement);
        }

        return mapElement;
    }

    #addMapRow() {
        const rowElement = document.createElement('div');

        rowElement.classList = ['map-row'];

        return rowElement;
    }

    #addMapTile(tile, x, y) {
        const tileElement = document.createElement('div');

        tileElement.classList = tile === '-' ? ['tile'] : ['tile tile-' + tile];
        tileElement.dataset.x = x;
        tileElement.dataset.y = y;

        return tileElement;
    }

    bindGame(game) {
        let mapElement = document.getElementById('map');

        if (!mapElement) {
            mapElement = this.#addMap(game.map.tiles);

            document.getElementById('map-container').appendChild(mapElement);
        }

        this.#removeStyles();

        if (game.turns) {
            this.#markTilesAsActive(game);
            this.#markTilesAsCurrent(game);
            this.#markTilesAsInactive(game);
        }
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

    #removeStyles() {
        const tileElements = document.getElementsByClassName('tile');

        for (const tileElement of tileElements) {
            ['active', 'current', 'inactive'].forEach(that => tileElement.classList.remove(that));
        }
    }
};
