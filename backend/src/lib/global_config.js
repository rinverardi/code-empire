export const GlobalConfig = Object.freeze({
    backend: {
        bindPort: 8001
    },
    game: {
        player: {
            initialHealth: 10
        },
    },
    redis: {
        url: 'redis://empire-persistence:6379/'
    }
});
