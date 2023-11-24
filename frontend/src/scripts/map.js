export class MapTile {
    static element(x, y) {
        return document.getElementById(MapTile.elementId(x, y));
    }

    static elementId(x, y) {
        return `tile-${x}-${y}`;
    }
}

export class MapView {
    #buildMap(tiles) {
        const mapElement = document.createElement('div');

        mapElement.id = 'map';

        for (let y = 0; y < tiles.length; y++) {
            const rowElement = this.#buildRow();

            for (let x = 0; x < tiles[y].length; x++) {
                const tile = tiles[y][x];

                if (tile !== ' ') {
                    const tileElement = this.#buildTile(tile, x, y);

                    rowElement.appendChild(tileElement);
                }
            }

            mapElement.appendChild(rowElement);
        }

        return mapElement;
    }

    #buildRow() {
        const rowElement = document.createElement('div');

        rowElement.classList = ['map-row'];

        return rowElement;
    }

    #buildTile(tile, x, y) {
        const tileElement = document.createElement('div');

        tileElement.classList.add('tile');

        tileElement.classList.add({
            f: 'tile-forest',
            g: 'tile-grass',
            h: 'tile-hill',
            m: 'tile-mountain',
            w: 'tile-water'
        }[tile]);

        tileElement.dataset.x = x;
        tileElement.dataset.y = y;
        tileElement.id = MapTile.elementId(x, y);

        return tileElement;
    }

    bindGame(game) {
        let mapElement = document.getElementById('map');

        if (!mapElement) {
            mapElement = this.#buildMap(game.map.tiles);

            document.getElementById('map-container').appendChild(mapElement);
        }
    }
};
