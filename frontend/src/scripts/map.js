export class MapTile {
    static element(x, y) {
        return document.getElementById(MapTile.elementId(x, y));
    }

    static elementId(x, y) {
        return `tile-${x}-${y}`;
    }
}

export class MapView {
    #bound = false;

    bindGame(game) {
        if (!this.#bound) {
            this.#bound = true;

            this.#build(game);
        }
    }

    #build(game) {
        const tiles = game.map.tiles;

        for (let y = 0; y < tiles.length; y++) {
            const rowElement = this.#buildRow();

            for (let x = 0; x < tiles[y].length; x++) {
                const tile = tiles[y][x];

                if (tile !== ' ') {
                    const tileElement = this.#buildTile(tile, x, y);

                    rowElement.appendChild(tileElement);
                }
            }

            document.getElementById('map').appendChild(rowElement);
        }
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
};
