import { AuthzError } from './authz.js';
import { Game } from '../game/game.js';
import { GlobalContext } from '../lib/global_context.js';
import { Player } from '../player/player.js';

class TestContext extends GlobalContext { }

test('Can abort game', () => {
    const testContext = new TestContext();

    const game = { status: Game.Status.waiting };
    const player = { role: Player.Role.master };

    testContext.authz().canAbortGame(game, player).orThrow();
});

test('Can execute turn', () => {
    const testContext = new TestContext();

    const game = {
        status: Game.Status.running,
        turn: {
            player: 'udue3iimhzpgwybi'
        }
    };

    const player = {
        id: 'udue3iimhzpgwybi',
        status: Player.Status.alive
    };

    testContext.authz().canExecuteTurn(game, player).orThrow();
});

test('Can forfeit game', () => {
    const testContext = new TestContext();

    const game = { status: Game.Status.running };

    testContext.authz().canForfeitGame(game).orThrow();
});

test('Can join game', () => {
    const testContext = new TestContext();

    const game = { status: Game.Status.waiting };

    testContext.authz().canJoinGame(game).orThrow();
});

test('Can leave game', () => {
    const testContext = new TestContext();

    const game = { status: Game.Status.waiting };

    testContext.authz().canLeaveGame(game).orThrow();
});

test('Can send message', () => {
    const testContext = new TestContext();

    const game = { status: Game.Status.running };
    const player = { status: Player.Status.alive };

    testContext.authz().canSendMessage(game, player).orThrow();
});

test('Can skip turn', () => {
    const testContext = new TestContext();

    const game = {
        status: Game.Status.running,
        turn: {
            player: 'jhb4gcmgm4rbxcqj'
        }
    };

    const player = {
        id: 'jhb4gcmgm4rbxcqj',
        status: Player.Status.alive
    };

    testContext.authz().canSkipTurn(game, player).orThrow();
});

test('Can start game', () => {
    const testContext = new TestContext();

    const game = { status: Game.Status.waiting };
    const player = { role: Player.Role.master };

    testContext.authz().canStartGame(game, player).orThrow();
});

test('Cannot abort game (wrong game status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Game.Status).filter(that => that !== Game.Status.waiting);

    for (const status of statusSet) {
        const game = { status };
        const player = { role: Player.Role.master };

        expect(() => testContext.authz().canAbortGame(game, player).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot abort game (wrong player role)', () => {
    const testContext = new TestContext();

    const roleSet = Object.keys(Player.Role).filter(that => that !== Player.Role.master);

    for (const role of roleSet) {
        const game = { status: Game.Status.waiting };
        const player = { role };

        expect(() => testContext.authz().canAbortGame(game, player).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot execute turn (wrong game status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Game.Status).filter(that => that !== Game.Status.running);

    for (const status of statusSet) {
        const game = {
            status,
            turn: {
                player: '1psdtznhqnsjl5dk'
            }
        };

        const player = {
            id: '1psdtznhqnsjl5dk',
            status: Player.Status.alive
        };

        expect(() => testContext.authz().canExecuteTurn(game, player).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot execute turn (wrong player)', () => {
    const testContext = new TestContext();

    const game = {
        status: Game.Status.running,
        turn: {
            player: 'iep4u2vm3lpikvpj'
        }
    };

    const player = {
        id: 'tdxahfg1zsmh5n0x',
        status: Player.Status.alive
    };

    expect(() => testContext.authz().canExecuteTurn(game, player).orThrow()).toThrow(AuthzError);
});

test('Cannot execute turn (wrong player status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Player.Status).filter(that => that !== Player.Status.alive);

    for (const status of statusSet) {
        const game = {
            status: Game.Status.running,
            turn: {
                player: 'biu54birwhh5sjio'
            }
        };

        const player = {
            id: 'biu54birwhh5sjio',
            status
        };

        expect(() => testContext.authz().canExecuteTurn(game, player).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot forfeit game (wrong game status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Game.Status).filter(that => that !== Game.Status.running);

    for (const status of statusSet) {
        const game = { status };

        expect(() => testContext.authz().canForfeitGame(game).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot join game (wrong game status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Game.Status).filter(that => that !== Game.Status.waiting);

    for (const status of statusSet) {
        const game = { status };

        expect(() => testContext.authz().canJoinGame(game).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot leave game (wrong game status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Game.Status).filter(that => that !== Game.Status.waiting);

    for (const status of statusSet) {
        const game = { status };

        expect(() => testContext.authz().canLeaveGame(game).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot send message (wrong game status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Game.Status).filter(that => that !== Game.Status.running);

    for (const status of statusSet) {
        const game = { status };
        const player = { status: Player.Status.alive };

        expect(() => testContext.authz().canSendMessage(game, player).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot send message (wrong player status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Player.Status).filter(that => that !== Player.Status.alive);

    for (const status of statusSet) {
        const game = { status: Game.Status.running };
        const player = { status };

        expect(() => testContext.authz().canSendMessage(game, player).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot skip turn (wrong game status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Game.Status).filter(that => that !== Game.Status.running);

    for (const status of statusSet) {
        const game = {
            status,
            turn: {
                player: 'semyjmiklntv40ko'
            }
        };

        const player = {
            id: 'semyjmiklntv40ko',
            status: Player.Status.alive
        };

        expect(() => testContext.authz().canSkipTurn(game, player).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot skip turn (wrong player)', () => {
    const testContext = new TestContext();

    const game = {
        status: Game.Status.running,
        turn: {
            player: '3gbull3bmtx1phuz'
        }
    };

    const player = {
        id: '4vlcg5cxrwnbvspy',
        status: Player.Status.alive
    };

    expect(() => testContext.authz().canSkipTurn(game, player).orThrow()).toThrow(AuthzError);
});

test('Cannot skip turn (wrong player status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Player.Status).filter(that => that !== Player.Status.alive);

    for (const status of statusSet) {
        const game = {
            status: Game.Status.running,
            turn: {
                player: 'luty3xsc5c1gkikl'
            }
        };

        const player = {
            id: 'luty3xsc5c1gkikl',
            status
        };

        expect(() => testContext.authz().canSkipTurn(game, player).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot start game (wrong game status)', () => {
    const testContext = new TestContext();

    const statusSet = Object.keys(Game.Status).filter(that => that !== Game.Status.waiting);

    for (const status of statusSet) {
        const game = { status };
        const player = { role: Player.Role.master };

        expect(() => testContext.authz().canStartGame(game, player).orThrow()).toThrow(AuthzError);
    }
});

test('Cannot start game (wrong player role)', () => {
    const testContext = new TestContext();

    const roleSet = Object.keys(Player.Role).filter(that => that !== Player.Role.master);

    for (const role of roleSet) {
        const game = { status: Game.Status.waiting };
        const player = { role };

        expect(() => testContext.authz().canStartGame(game, player).orThrow()).toThrow(AuthzError);
    }
});
