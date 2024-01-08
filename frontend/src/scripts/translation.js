import { String } from './util.js';

export class Translation {
    #buttons = {
        de: {
            abortGame: 'Partie abbrechen',
            back: 'Zurück',
            close: 'Schliessen',
            createGame: 'Partie erstellen',
            forfeitGame: 'Partie aufgeben',
            joinGame: 'Partie beitreten',
            leaveGame: 'Partie verlassen',
            next: 'Weiter',
            openChat: 'Nachrichten',
            openMenu: 'Menü',
            openRanking: 'Ranglist',
            resumeGame: 'Partie fortsetzen',
            sendMessage: 'Senden',
            showHighscores: 'Highscores anzeigen',
            showInstructions: 'Anleitung anzeigen',
            skipTurn: 'Zug überspringen',
            startGame: 'Partie starten'
        },
        en: {
            abortGame: 'Abort game',
            back: 'Back',
            close: 'Close',
            createGame: 'Create game',
            forfeitGame: 'Forfeit game',
            joinGame: 'Join game',
            leaveGame: 'Leave game',
            next: 'Next',
            openChat: 'Chat',
            openMenu: 'Menu',
            openRanking: 'Ranking',
            resumeGame: 'Resume game',
            sendMessage: 'Send',
            showHighscores: 'Show highscores',
            showInstructions: 'Show instructions',
            skipTurn: 'Skip turn',
            startGame: 'Start game'
        }
    }

    #entities = {
        de: {
            factory: 'Fabrik',
            player: 'Spieler',
            resource: 'Ressource',
            tileWithGrass: 'Wiese',
            tileWithHill: 'Hügel',
            tileWithMountain: 'Berg',
            tileWithWater: 'Wasser',
            tileWithWood: 'Wald',
            village: 'Dorf'
        },
        en: {
            factory: 'Factory',
            player: 'Player',
            resource: 'Resource',
            tileWithGrass: 'Meadow',
            tileWithHill: 'Hill',
            tileWithMountain: 'Mountain',
            tileWithWater: 'Water',
            tileWithWood: 'Wood',
            village: 'Village'
        }
    }

    #instructions = {
        de: {
            paragraph0: 'Die <b>Karte</b> besteht aus einer Menge von Kartenfeldern.',
            paragraph1: 'Die <b>Kartenfelder</b> sind als Hexagone angeordnet. Es gibt fünf Arten von Feldern. Je nach Art des Felds können unterschiedliche Objekte darauf platziert sein:',
            paragraph2: 'Auf der Karte sind <b>Ressourcen</b> verteilt. Die Ressourcen werden bei Spielbeginn auf zufälligen Kartenfeldern platziert. Mehrere Ressourcen auf einem Feld sind nicht möglich. Eingesammelte Ressourcen verschwinden von der Karte und wachsen nach neun Spielrunden wieder nach.',
            paragraph3: 'Jeder Spieler hat eine <b>Spielfigur</b>. Die Figuren werden bei Spielbeginn auf zufälligen Kartenfeldern platziert. Mehrere Figuren auf einem Feld sind nicht möglich. Befindet sich eine Spielfigur auf einem Spielfeld mit einer Ressource, so sammelt sie die Ressource automatisch ein.',
            paragraph4: 'Eine Partie besteht aus einer Reihe von <b>Spielrunden</b>.',
            paragraph5: 'Pro Spielrunde führt jeder Spieler einen <b>Spielzug</b> durch. Es gibt sechs Arten von Zügen. Je nach Art des Zugs werden unterschiedliche Ressourcen in verschiedenen Mengen benötigt:',
            paragraph6: 'Das <b>Spielziel</b> ist es, das mächtigste Imperium zu erschaffen. Es gibt drei Möglichkeiten, um dieses Ziel zu erreichen: Hundert Goldstücke besitzen, drei Metropolen besitzen oder alle Gegenspieler vernichten. Das Spiel endet sofort, sobald eine dieser Marken erreicht wird.',
            paragraph7: 'Für die <b>Highscores</b> relevant sind die Goldstücke, die der Sieger bei Spielende besitzt. Wenn der Sieger ein Ergebnis erzielt, das zu den zehn besten Ergebnissen aller Zeiten gehört, dann wird das Ergebnis in den Highscores gespeichert.'
        },
        en: {
            paragraph0: 'The <b>map</b> consists of a number of map tiles.',
            paragraph1: 'The <b>map tiles</b> are arranged as hexagons. There are five types of tiles. Depending on the type of tile, different objects can be placed on it:',
            paragraph2: '<b>Resources</b> are distributed on the map. The resources are placed on random map tiles when the game starts. It is not possible to have multiple resources on one tile. Collected resources disappear from the map and grow back after nine rounds.',
            paragraph3: 'Each player has a <b>game piece</b>. The pieces are placed on random map tiles when the game starts. It is not possible to have multiple pieces on one tile. If a piece is on a tile with a resource, it automatically collects the resource.',
            paragraph4: 'A game consists of a series of <b>rounds</b>.',
            paragraph5: 'Each player executes one <b>turn</b> per round. There are six types of moves. Depending on the type of move, different resources are required in different quantities:',
            paragraph6: 'The <b>goal</b> of the game is to create the most powerful empire. There are three ways to achieve this goal: Own one hundred gold pieces, own three metropolises or destroy all opponents. The game ends immediately as soon as one of these objectives is reached.',
            paragraph7: 'The gold pieces that the winner has at the end of the game are relevant for the <b>highscores</b>. If the winner achieves a result that is one of the ten best results of all time, the result is saved in the highscores.'
        }
    }

    #labels = {
        de: {
            game: 'Partie:',
            map: 'Karte:',
            name: 'Dein Nickname:'
        },
        en: {
            game: 'Game:',
            map: 'Map:',
            name: 'Your nickname:'
        }
    }

    #language;

    #maps = {
        de: {
            0: 'Weite Wiesen',
            1: 'Nebliges Nirvana',
            2: 'Glühende Gipfel'
        },
        en: {
            0: 'Meaty Meadows',
            1: 'Nebulous Nirvana',
            2: 'Pristine Peaks'
        }
    }

    #notifications = {
        de: {
            connectionClosed: 'Die Verbindung wurde geschlossen!',
            connectionFailed: 'Die Verbindung schlug fehl!',
            someoneAttacksSomeone: '{0} attackiert {1}.<br>(noch {2} Trefferpunkte)',
            someoneAttacksYou: '{0} attackiert dich!<br>(noch {1} Trefferpunkte)',
            someoneKillsSomeone: '{0} hat {1} eliminiert.',
            someoneKillsYou: '{0} hat dich eliminiert!',
            someoneThinks: '{0} ist am Überlegen ...',
            youAttack: 'Du attackierst {0}.<br>(noch {1} Trefferpunkte)',
            youKill: 'Du hast {0} eliminiert.',
            youThink: 'Du bist am Zug!'
        },
        en: {
            connectionClosed: 'The connection was closed!',
            connectionFailed: 'The connection failed!',
            someoneAttacksSomeone: '{0} attacks {1}.<br>({2} hit points remaining)',
            someoneAttacksYou: '{0} attacks you!<br>({1} hit points remaining)',
            someoneKillsSomeone: '{0} eliminated {1}.',
            someoneKillsYou: '{0} eliminated you!',
            someoneThinks: '{0} is thinking ...',
            youAttack: 'You attack {0}.<br>({1} hit points remaining)',
            youKill: 'You eliminated {0}.',
            youThink: 'It is your turn!'
        }
    };

    #placeholders = {
        de: {
            message: 'Mitteilung'
        },
        en: {
            message: 'Message'
        }
    }

    #resources = {
        de: {
            food: 'Nahrung',
            gold: 'Gold',
            science: 'Forschung',
            weaponry: 'Waffer'
        },
        en: {
            food: 'Food',
            gold: 'Gold',
            science: 'Science',
            weaponry: 'Weaponry'
        }
    }

    #results = {
        de: {
            winnerHasGold: '{0} gewinnt mit {1} Goldstücken.',
            winnerHasMetropolises: '{0} gewinnt mit {1} Metropolen.',
            winnerSurvives: '{0} gewinnt als einziger Überlebender.'
        },
        en: {
            winnerHasGold: '{0} wins with {1} gold pieces.',
            winnerHasMetropolises: '{0} wins with {1} metropolises.',
            winnerSurvives: '{0} wins as the sole survivor.'
        }
    }

    #structures = {
        de: {
            someonesCity: 'Stadt von {0}',
            someonesFactory: 'Fabrik von {0}',
            someonesMetropolis: 'Metropole von {0}',
            someonesVillage: 'Dorf von {0}',
            yourCity: 'Deine Stadt',
            yourFactory: 'Deine Fabrik',
            yourMetropolis: 'Deine Metropole',
            yourVillage: 'Dein Dorf'
        },
        en: {
            someonesCity: 'City of {0}',
            someonesFactory: 'Factory of {0}',
            someonesMetropolis: 'Metropolis of {0}',
            someonesVillage: 'Village of {0}',
            yourCity: 'Your city',
            yourFactory: 'Your factory',
            yourMetropolis: 'Your metropolis',
            yourVillage: 'Your village'
        }
    };

    #tips = {
        de: {
            existingName: 'Nickname bereits vergeben.',
            me: 'Ich',
            missingGame: 'Keine Partie gewählt.',
            missingName: 'Kein Nickname eingegeben.',
            missingPlayer: 'Zu wenige Teilnehmer.',
            player: '{0}<br>({1} Trefferpunkte)'
        },
        en: {
            existingName: 'Nickname already in use.',
            me: 'Me',
            missingGame: 'No game selected.',
            missingName: 'No nickname entered.',
            missingPlayer: 'Too few participants.',
            player: '{0}<br>({1} hit points)'
        }
    };

    #titles = {
        de: {
            createGame1: 'Partie erstellen',
            createGame2: 'Auf Gegner warten',
            gameOver: 'Spielende',
            joinGame1: 'Partie beitreten',
            joinGame2: 'Auf Gegner warten',
            ranking: 'Rangliste',
            showHighscores: 'Highscores',
            showInstructions: 'Anleitung'
        },
        en: {
            createGame1: 'Create Game',
            createGame2: 'Waiting for Oponents',
            gameOver: 'Game Over',
            joinGame1: 'Join Game',
            joinGame2: 'Waiting for Oponents',
            ranking: 'Ranking',
            showHighscores: 'Highscores',
            showInstructions: 'Instructions'
        }
    };

    #turns = {
        de: {
            'attack': 'Gegenspieler angreifen',
            'buildCity': 'Dorf zu Stadt ausbauen',
            'buildFactory': 'Fabrik errichten',
            'buildMetropolis': 'Stadt zu Metropole ausbauen',
            'buildVillage': 'Dorf gründen',
            'move': 'Spielfigur bewegen'
        },
        en: {
            'attack': 'Attack opponent',
            'buildCity': 'Upgrade village to city',
            'buildFactory': 'Construct factory',
            'buildMetropolis': 'Upgrade city to metropolis',
            'buildVillage': 'Found village',
            'move': 'Move game piece'
        }
    }

    #values = {
        de: {
            emptySlot: 'Leerer Slot',
            noGames: 'Keine Partien'
        },
        en: {
            emptySlot: 'Empty slot',
            noGames: 'No games'
        }
    }

    constructor() {
        const preferredLanguages = navigator.languages;
        const supportedLanguages = ['de', 'en'];

        for (const preferredLanguage of preferredLanguages) {
            for (const supportedLanguage of supportedLanguages) {
                const supportedPrefix = supportedLanguage + '-';

                if (preferredLanguage === supportedLanguage || preferredLanguage.startsWith(supportedPrefix)) {
                    this.#language = supportedLanguage;
                    return;
                }
            }
        }

        this.#language = supportedLanguages[0];
    }

    button(key) {
        return this.#buttons[this.#language][key];
    }

    entity(key) {
        return this.#entities[this.#language][key];
    }

    instruction(key) {
        return this.#instructions[this.#language][key];
    }

    label(key) {
        return this.#labels[this.#language][key];
    }

    map(key) {
        return this.#maps[this.#language][key];
    }

    notification(key, params) {
        const value = this.#notifications[this.#language][key];

        return String.parameterize(value, params);
    }

    placeholder(key) {
        return this.#placeholders[this.#language][key];
    }

    resource(key) {
        return this.#resources[this.#language][key];
    }

    result(key, params) {
        const value = this.#results[this.#language][key];

        return String.parameterize(value, params);
    }

    structure(key, params) {
        const value = this.#structures[this.#language][key];

        return String.parameterize(value, params);
    }

    tip(key, params) {
        const value = this.#tips[this.#language][key];

        return String.parameterize(value, params);
    }

    title(key) {
        return this.#titles[this.#language][key];
    }

    turn(key) {
        return this.#turns[this.#language][key];
    }

    value(key) {
        return this.#values[this.#language][key];
    }
};

export class TranslationView {
    #translation;

    constructor(context) {
        this.#translation = context.translation();
    }

    translate() {
        const types = ['button', 'entity', 'instruction', 'label', 'resource', 'title', 'turn', 'value'];

        for (const type of types) {
            for (const element of document.querySelectorAll(`[data-${type}]`)) {
                element.innerHTML = this.#translation[type](element.dataset[type]);
            }
        }

        for (const element of document.querySelectorAll(`[data-placeholder]`)) {
            element.placeholder = this.#translation.placeholder(element.dataset.placeholder);
        }
    }
}
