export const GlobalConfig = Object.freeze({
    backend: {
        port: 8001
    },
    objectives: {
        haveGold: 100,
        haveMetropolises: 3
    },
    players: {
        initialFood: 0,
        initialGold: 0,
        initialHealth: 10,
        initialResearch: 0,
        initialWeaponry: 0,
    },
    resources: {
        respawnAfter: 9
    },
    highscores: {
        maxEntries: 10
    },
    redis: {
        url: 'redis://empire-persistence:6379/'
    },
    slots: {
        maxPlayers: 4,
        minPlayers: 2
    }
});
