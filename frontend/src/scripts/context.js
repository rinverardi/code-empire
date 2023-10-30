import { Communication } from './communication.js';
import { GameHelper } from './game.js';
import { MapBuilder } from './map.js';
import { Navigation } from './navigation.js';
import { NotificationHelper } from './notifications.js';
import { Player } from './player.js';
import { Random } from './random.js';
import { Translation } from './translation.js';

export class Context {
    #communication;
    #gameHelper;
    #mapBuilder;
    #navigation;
    #notificationHelper;
    #player;
    #random;
    #translation;

    communication() {
        return this.#communication ? this.#communication : this.#communication = new Communication(this);
    }

    gameHelper() {
        return this.#gameHelper ? this.#gameHelper : this.#gameHelper = new GameHelper();
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

    player() {
        return this.#player ? this.#player : this.#player = new Player(this);
    }

    random() {
        return this.#random ? this.#random : this.#random = new Random();
    }
    translation() {
        return this.#translation ? this.#translation : this.#translation = new Translation();
    }
};