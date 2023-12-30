import { Resource } from '../resource/resource.js';
import { Structure } from '../structure/structure.js';

export class PlayerAccess {
    countGold(player) {
        return player.inventory[Resource.Type.gold];
    }

    countMetropolises(game, player) {
        return game.structures
            .filter(that => that.player === player.id)
            .filter(that => that.type === Structure.Type.metropolis.value)
            .length;
    }
};
