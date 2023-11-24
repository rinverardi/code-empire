import { Communication } from './communication.js';
import { GameHelper } from './game.js';
import { InventoryView } from './inventory.js';
import { MapView } from './map.js';
import { Navigation } from './navigation.js';
import { NotificationHelper } from './notification.js';
import { PlayerHelper, PlayerView } from './player.js';
import { Random } from './random.js';
import { ResourceView } from './resource.js';
import { Translation } from './translation.js';
import { TurnHelper, TurnView } from './turn.js';

export class Context {
    #communication;
    #gameHelper;
    #inventoryView;
    #mapView;
    #navigation;
    #notificationHelper;
    #playerHelper;
    #playerView;
    #random;
    #resourceView;
    #translation;
    #turnHelper;
    #turnView;

    communication() {
        return this.#communication ? this.#communication : this.#communication = new Communication(this);
    }

    gameHelper() {
        return this.#gameHelper ? this.#gameHelper : this.#gameHelper = new GameHelper(this);
    }

    inventoryView() {
        return this.#inventoryView ? this.#inventoryView : this.#inventoryView = new InventoryView(this);
    }

    mapView() {
        return this.#mapView ? this.#mapView : this.#mapView = new MapView();
    }

    navigation() {
        return this.#navigation ? this.#navigation : this.#navigation = new Navigation(this);
    }

    notificationHelper() {
        return this.#notificationHelper ? this.#notificationHelper : this.#notificationHelper = new NotificationHelper();
    }

    playerHelper() {
        return this.#playerHelper ? this.#playerHelper : this.#playerHelper = new PlayerHelper(this);
    }

    playerView() {
        return this.#playerView ? this.#playerView : this.#playerView = new PlayerView();
    }

    random() {
        return this.#random ? this.#random : this.#random = new Random();
    }

    resourceView() {
        return this.#resourceView ? this.#resourceView : this.#resourceView = new ResourceView();
    }

    translation() {
        return this.#translation ? this.#translation : this.#translation = new Translation();
    }

    turnHelper() {
        return this.#turnHelper ? this.#turnHelper : this.#turnHelper = new TurnHelper();
    }

    turnView() {
        return this.#turnView ? this.#turnView : this.#turnView = new TurnView(this);
    }
};