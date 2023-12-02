export class MapMapper {
    #gameAccess;

    constructor(globalContext) {
        this.#gameAccess = globalContext.gameAccess();
    }

    #applyVisibility(tiles, visibility) {
        for (let y = 0; y < tiles.length; y++) {
            let row = '';

            for (let x = 0; x < tiles[y].length; x++) {
                if (tiles[y][x] === ' ') {
                    row += ' ';
                } else {
                    row += visibility[y][x] === '1' ? tiles[y][x] : '-';
                }
            }

            tiles[y] = row;
        }
    }

    mapInto(sessionContext, source, target) {
        target.map = { id: source.map.id };

        if (source.map.tiles) {
            const visibility = this.#gameAccess.getVisibility(sessionContext, source);

            if (visibility) {
                target.map.tiles = source.map.tiles;

                this.#applyVisibility(target.map.tiles, visibility);
            }
        }
    }
};
