export class MapBuilder {
    build(source) {
        const target = document.createElement('div');

        target.id = 'map';

        for (const sourceRow of source) {
            target.appendChild(this.buildRow(sourceRow));
        }

        return target;
    }

    buildRow(source) {
        const target = document.createElement('div');

        target.classList = ['map-row'];

        for (const sourceTile of source) {
            if (sourceTile !== ' ') {
                target.appendChild(this.buildTile(sourceTile));
            }
        }

        return target;
    }

    buildTile(source) {
        const target = document.createElement('div');

        target.classList = source === '-' ? ['tile'] : ['tile tile-' + source];

        return target;
    }
};