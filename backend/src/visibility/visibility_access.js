import { StringHelper } from '../lib/string_helper.js';

export class VisibilityAccess {
    setVisibilityAt(player, x, y, visibility) {
        player.visibility[y] = StringHelper.replaceAt(player.visibility[y], x, visibility);
    }
};
