export class MapTile {
    static element(x, y) {
        return document.getElementById(MapTile.elementId(x, y));
    }

    static elementId(x, y) {
        return `tile-${x}-${y}`;
    }
}

export class MapView {
    #playerHelper;

    constructor(context) {
        this.#playerHelper = context.playerHelper();
    }

    #addMap(tiles) {
        const mapElement = document.createElement('div');

        mapElement.id = 'map';

        for (let y = 0; y < tiles.length; y++) {
            const rowElement = this.#addRow();

            for (let x = 0; x < tiles[y].length; x++) {
                const tile = tiles[y][x];

                if (tile !== ' ') {
                    const tileElement = this.#addTile(tile, x, y);

                    rowElement.appendChild(tileElement);
                }
            }

            mapElement.appendChild(rowElement);
        }

        return mapElement;
    }

    #addRow() {
        const rowElement = document.createElement('div');

        rowElement.classList = ['map-row'];

        return rowElement;
    }

    #addTile(tile, x, y) {
        const tileElement = document.createElement('div');

        tileElement.classList = tile === '-' ? ['tile'] : ['tile tile-' + tile];
        tileElement.dataset.x = x;
        tileElement.dataset.y = y;
        tileElement.id = MapTile.elementId(x, y);

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

    #markTilesAsActive(game) {
        for (const turn of game.turns) {
            const tileElement = MapTile.element(...turn.positionTo);

            tileElement.classList.add('active');
        }
    }

    #markTilesAsCurrent(game) {
        if (this.#playerHelper.isCurrentPlayer(game)) {
            const player = this.#playerHelper.getPlayer(game);

            const tileElement = MapTile.element(...player.position);

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
