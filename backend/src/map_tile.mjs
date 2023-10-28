export class MapTile {
    static get Type() {
        return Object.freeze({
            forest: 'f',
            grass: 'g',
            hill: 'h',
            mountain: 'm',
            water: 'w'
        })
    }
};