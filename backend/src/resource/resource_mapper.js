import { ArrayHelper } from "../lib/array_helper.js";
import { Visibility } from "../visibility/visibility.js";

export class ResourceMapper {
    #gameAccess;

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
    }

    #applyVisibility(resources, visibility) {
        ArrayHelper.filterInPlace(resources, that => {
            let [x, y] = that.position;

            return visibility[y][x] === Visibility.clear;
        });
    }

    mapInto(sessionContext, source, target) {
        target.resources = [];

        const visibility = this.#gameAccess.getVisibility(sessionContext, source);

        if (visibility) {
            target.resources.push(...source.resources);

            this.#applyVisibility(target.resources, visibility);
        }
    }
};
