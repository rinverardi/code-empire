/**
 * Provides helper functions for looking up tile elements or element IDs.
 */

export class MapTile {

    /**
     * Looks up an HTML element, given its position on the map.
     *
     * @param {number} x the x-coordinate of the position
     * @param {number} y the y-coordinate of the position
     * @returns {object} the HTML element
     */

    static element(x, y) {
        return document.getElementById(MapTile.elementId(x, y));
    }

    /**
     * Looks up an HTML element ID, given its position on the map.
     *
     * @param {number} x the x-coordinate of the position
     * @param {number} y the y-coordinate of the position
     * @returns {object} the HTML element
     */

    static elementId(x, y) {
        return `tile-${x}-${y}`;
    }
}

/**
 * Updates the map-related portion of the user interface.
 */

export class MapView {
    #built = false;

    #elements = {
        map: document.getElementById('map'),
        resourceLayer: document.getElementById('resource-layer')
    };

    /**
     * Updates the user inteface, given the current state of the game.
     *
     * @param {object} game the game
     */

    bindGame(game) {
        if (!this.#built) {
            this.#built = true;

            this.#build(game);
        }

        this.#update(game);
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

            this.#elements.map.insertBefore(rowElement, this.#elements.resourceLayer);
        }
    }

    #buildRow() {
        const rowElement = document.createElement('div');

        rowElement.classList = ['map-row'];

        return rowElement;
    }

    #buildTile(tile, x, y) {
        const tileElement = document.createElement('div');

        tileElement.classList.add('obscured');
        tileElement.classList.add('tile');
        tileElement.dataset.x = x;
        tileElement.dataset.y = y;
        tileElement.id = MapTile.elementId(x, y);

        return tileElement;
    }

    #update(game) {
        const tiles = game.map.tiles;

        for (let y = 0; y < tiles.length; y++) {
            for (let x = 0; x < tiles[y].length; x++) {
                const tile = tiles[y][x];

                if (tile !== ' ' && tile !== '-') {
                    const tileElement = MapTile.element(x, y);

                    tileElement.classList.add({
                        f: 'tile-forest',
                        g: 'tile-grass',
                        h: 'tile-hill',
                        m: 'tile-mountain',
                        w: 'tile-water'
                    }[tile]);

                    tileElement.classList.remove('obscured');
                }
            }
        }
    }
};
