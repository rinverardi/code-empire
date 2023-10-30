import { Communication } from './communication.js';
import { GameHelper } from './game.js';
import { Map } from './map.js';
import { Navigation } from './navigation.js';
import { Player } from './player.js';
import { Random } from './random.js';
import { Translation } from './translation.js';

export class Context {
    #communication;
    #gameHelper;
    #map;
    #navigation;
    #player;
    #random;
    #translation;

    communication() {
        return this.#communication ? this.#communication : this.#communication = new Communication(this);
    }

    gameHelper() {
        return this.#gameHelper ? this.#gameHelper : this.#gameHelper = new GameHelper();
    }

    map() {
        return this.#map ? this.#map : this.#map = new Map();
    }

    navigation() {
        return this.#navigation ? this.#navigation : this.#navigation = new Navigation();
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