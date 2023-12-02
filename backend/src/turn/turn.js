export class Turn {
    static get Direction() {
        return Object.freeze({
            east: { x: 2, y: 0 },
            northEast: { x: 1, y: -1 },
            northWest: { x: -1, y: -1 },
            southEast: { x: 1, y: 1 },
            southWest: { x: -1, y: 1},
            west: { x: -2, y: 0 }
        })
    }

    static get Type() {
        return Object.freeze({
            attack: 'attack',
            move: 'move'
        });
    }
};
