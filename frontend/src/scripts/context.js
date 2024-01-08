import { ChatView } from './chat.js';
import { Communication } from './communication.js';
import { GameHelper } from './game.js';
import { HighscoreView } from './highscore.js';
import { InventoryView } from './inventory.js';
import { MapView } from './map.js';
import { Navigation } from './navigation.js';
import { NotificationHelper, NotificationView } from './notification.js';
import { PlayerHelper, PlayerView } from './player.js';
import { Random } from './random.js';
import { RankingView } from './ranking.js';
import { ResourceView } from './resource.js';
import { StructureView } from './structure.js';
import { TipManager, TipView } from './tip.js';
import { Translation, TranslationView } from './translation.js';
import { TurnHelper, TurnView } from './turn.js';
import { WinnerView } from './winner.js';

export class Context {
    #chatView;
    #communication;
    #gameHelper;
    #highscoreView;
    #inventoryView;
    #mapView;
    #navigation;
    #notificationHelper;
    #notificationView;
    #playerHelper;
    #playerView;
    #random;
    #rankingView;
    #resourceView;
    #structureView;
    #tipManager;
    #tipView;
    #translation;
    #translationView;
    #turnHelper;
    #turnView;
    #winnerView;

    chatView() {
        return this.#chatView ? this.#chatView : this.#chatView = new ChatView(this);
    }

    communication() {
        return this.#communication ? this.#communication : this.#communication = new Communication(this);
    }

    gameHelper() {
        return this.#gameHelper ? this.#gameHelper : this.#gameHelper = new GameHelper(this);
    }

    highscoreView() {
        return this.#highscoreView ? this.#highscoreView : this.#highscoreView = new HighscoreView();
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

    notificationView() {
        return this.#notificationView ? this.#notificationView : this.#notificationView = new NotificationView(this);
    }

    playerHelper() {
        return this.#playerHelper ? this.#playerHelper : this.#playerHelper = new PlayerHelper(this);
    }

    playerView() {
        return this.#playerView ? this.#playerView : this.#playerView = new PlayerView(this);
    }

    random() {
        return this.#random ? this.#random : this.#random = new Random();
    }

    rankingView() {
        return this.#rankingView ? this.#rankingView : this.#rankingView = new RankingView();
    }

    resourceView() {
        return this.#resourceView ? this.#resourceView : this.#resourceView = new ResourceView();
    }

    structureView() {
        return this.#structureView ? this.#structureView : this.#structureView = new StructureView();
    }

    tipManager() {
        return this.#tipManager ? this.#tipManager : this.#tipManager = new TipManager(this);
    }

    tipView() {
        return this.#tipView ? this.#tipView : this.#tipView = new TipView(this);
    }

    translation() {
        return this.#translation ? this.#translation : this.#translation = new Translation();
    }

    translationView() {
        return this.#translationView ? this.#translationView : this.#translationView = new TranslationView(this);
    }

    turnHelper() {
        return this.#turnHelper ? this.#turnHelper : this.#turnHelper = new TurnHelper();
    }

    turnView() {
        return this.#turnView ? this.#turnView : this.#turnView = new TurnView(this);
    }

    winnerView() {
        return this.#winnerView ? this.#winnerView : this.#winnerView = new WinnerView(this);
    }
};
