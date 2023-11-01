import { Communication } from './communication.js';
import { GameHelper } from './game.js';
import { MapBuilder } from './map.js';
import { Navigation } from './navigation.js';
import { NotificationHelper } from './notifications.js';
import { PlayerBuilder, PlayerHelper } from './player.js';
import { Random } from './random.js';
import { Translation } from './translation.js';
import { TurnHelper } from './turn.js';

export class Context {
    #communication;
    #gameHelper;
    #mapBuilder;
    #navigation;
    #notificationHelper;
    #playerBuilder;
    #playerHelper;
    #random;
    #translation;
    #turnHelper;

    communication() {
        return this.#communication ? this.#communication : this.#communication = new Communication(this);
    }

    gameHelper() {
        return this.#gameHelper ? this.#gameHelper : this.#gameHelper = new GameHelper(this);
    }

    mapBuilder() {
        return this.#mapBuilder ? this.#mapBuilder : this.#mapBuilder = new MapBuilder();
    }

    navigation() {
        return this.#navigation ? this.#navigation : this.#navigation = new Navigation();
    }

    notificationHelper() {
        return this.#notificationHelper ? this.#notificationHelper : this.#notificationHelper = new NotificationHelper();
    }

    playerBuilder() {
        return this.#playerBuilder ? this.#playerBuilder : this.#playerBuilder = new PlayerBuilder();
    }

    playerHelper() {
        return this.#playerHelper ? this.#playerHelper : this.#playerHelper = new PlayerHelper(this);
    }

    random() {
        return this.#random ? this.#random : this.#random = new Random();
    }

    translation() {
        return this.#translation ? this.#translation : this.#translation = new Translation();
    }

    turnHelper() {
        return this.#turnHelper ? this.#turnHelper : this.#turnHelper = new TurnHelper();
    }
};