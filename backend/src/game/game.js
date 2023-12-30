export class Game {
    static get Key() {
        return Object.freeze({
            game: 'game',
            games: 'games'
        })
    }

    static get Objective() {
        return Object.freeze({
            haveGold: 'haveGold',
            haveMetropolises: 'haveMetropolises',
            survive: 'survive'
        });
    }

    static get Status() {
        return Object.freeze({
            aborted: 'aborted',
            ended: 'ended',
            missing: 'missing',
            running: 'running',
            waiting: 'waiting'
        });
    }
};
