import { ArrayHelper } from '../lib/array_helper.js';
import { Visibility } from '../visibility/visibility.js';

export class StructureMapper {
    #gameAccess;

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
    }

    #applyVisibility(structures, visibility) {
        ArrayHelper.filterInPlace(structures, that => {
            let [x, y] = that.position;

            return visibility[y][x] === Visibility.clear;
        });
    }

    mapInto(sessionContext, source, target) {
        target.structures = [];

        const visibility = this.#gameAccess.getVisibility(sessionContext, source);

        if (visibility) {
            target.structures.push(...source.structures);

            this.#applyVisibility(target.structures, visibility);
        }
    }
};
