export class Map {
    renderMap(source) {
        const target = document.createElement('map');

        target.id = 'map';

        for (const sourceRow of source) {
            target.appendChild(this.renderMapRow(sourceRow));
        }

        return target;
    }

    renderMapRow(source) {
        const target = document.createElement('div');

        target.classList = ['map-row'];

        for (const sourceTile of source) {
            if (sourceTile !== ' ') {
                target.appendChild(this.renderMapTile(sourceTile));
            }
        }

        return target;
    }

    renderMapTile(source) {
        const target = document.createElement('div');

        target.classList = source === '-' ? ['tile'] : ['tile tile-' + source];

        return target;
    }
};