export class MapView {
    #addActions(game) {
        for (const action of game.turn.actions) {
            const mapTile = this.#getMapTile(action.positionTo[0], action.positionTo[1]);

            mapTile.classList.add('active');
        }

        const mapTiles = document.getElementsByClassName('tile');

        for (const mapTile of mapTiles) {
            if (!Array.from(mapTile.classList).includes('active')) {
                mapTile.classList.add('inactive');
            }
        }
    }

    #buildMap(source) {
        const map = document.createElement('div');

        map.id = 'map';

        for (let y = 0; y < source.length; y++) {
            const mapRow = this.#buildMapRow();

            for (let x = 0; x < source[y].length; x++) {
                if (source[y][x] !== ' ') {
                    const mapTile = this.#buildMapTile(source, x, y);

                    mapRow.appendChild(mapTile);
                }
            }

            map.appendChild(mapRow);
        }

        return map;
    }

    #buildMapRow() {
        const element = document.createElement('div');

        element.classList = ['map-row'];

        return element;
    }

    #buildMapTile(source, x, y) {
        const target = document.createElement('div');

        target.classList = source === '-' ? ['tile'] : ['tile tile-' + source[y][x]];
        target.dataset.x = x;
        target.dataset.y = y;

        return target;
    }

    #getMapTile(x, y) {
        const mapTiles = document.getElementsByClassName('tile');

        for (const mapTile of mapTiles) {
            if (parseInt(mapTile.dataset.x) === x && parseInt(mapTile.dataset.y) === y) {
                return mapTile;
            }
        }

        throw new RangeError('No such tile');
    }

    #removeActions(game) {
        const mapTiles = document.getElementsByClassName('tile');

        for (const mapTile of mapTiles) {
            mapTile.classList.remove('active');
            mapTile.classList.remove('inactive');
        }
    }

    updateMap(game) {
        const map = document.getElementById('map');

        if (!map) {
            const map = this.#buildMap(game.map.tiles);

            document.getElementById('map-container').appendChild(map);
        }

        this.#removeActions(game);

        if (game.turn.actions) {
            this.#addActions(game);
        }
    }
};