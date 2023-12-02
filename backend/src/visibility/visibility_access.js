import { Visibility } from './visibility.js';

export class VisibilityAccess {
    getVisibilityAt(player, x, y) {
        const visibility = player.visibility[y][x];

        switch (tile) {
            case Visibility.clear:
            case Visibility.obscure:
                return visibility;

            default:
                throw new RangeError('No such visibility');
        }
    }
};
