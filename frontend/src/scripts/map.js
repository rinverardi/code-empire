export class MapBuilder {
    build(source) {
        const target = document.createElement('div');

        target.id = 'map';

        for (let index = 0; index < source.length; index++) {
            const element = this.#buildRow(source[index]);

            element.dataset.index = index;

            target.appendChild(element);
        }

        return target;
    }

    #buildRow(source) {
        const target = document.createElement('div');

        target.classList = ['map-row'];

        for (let index = 0; index < source.length; index++) {
            if (source[index] !== ' ') {
                const element = this.#buildTile(source[index]);

                element.dataset.index = index;

                target.appendChild(element);
            }
        }

        return target;
    }

    #buildTile(source) {
        const target = document.createElement('div');

        target.classList = source === '-' ? ['tile'] : ['tile tile-' + source];

        return target;
    }
};