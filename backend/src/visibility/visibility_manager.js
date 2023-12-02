import { Visibility } from './visibility.js';

export class VisibilityManager {
    startGame(game) {
        for (const player of game.players) {
            player.visibility = game.map.tiles.map(that => that.replace(/[^ ]/g, Visibility.clear));
        }
    }
};
