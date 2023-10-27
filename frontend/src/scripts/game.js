export class Game {
    static get Status() {
        return Object.freeze({
            aborted: 'aborted',
            executing: 'executing',
            missing: 'missing',
            thinking: 'thinking',
            waiting: 'waiting'
        });
    }
};