/**
 * The global configuration settings.
 * <p>
 * Settings can be overridden using environment variables (e.g., to override
 * the port number of the backend, set the 'BACKEND_PORT' variable).
 */

export const GlobalConfig = Object.freeze(override({
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
}));

function override(source, prefix) {
    const target = {};

    for (const key in source) {
        const variable = (prefix || '') + key.toUpperCase();

        if (typeof source[key] === 'object') {
            target[key] = override(source[key], variable + '_');
        } else {
            target[key] = process.env[variable] || source[key];
        }
    }

    return target;
}
