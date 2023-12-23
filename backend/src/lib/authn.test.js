import { AuthnError } from './authn.js';
import { GlobalContext } from '../lib/global_context.js';

class TestContext extends GlobalContext { }

test('Can get player', () => {
    const testContext = new TestContext();

    const game = { players: [{ id: 'k0tgyfd00rgexvdx' }] };
    const sessionContext = { playerId: 'k0tgyfd00rgexvdx' };

    expect(testContext.authn().getPlayer(sessionContext, game)).toBe(game.players[0]);

});

test('Cannot get player (error, no such player)', () => {
    const testContext = new TestContext();

    const game = { players: [] };
    const sessionContext = { playerId: 'jmcoywlj2uds4c0c' };

    expect(() => testContext.authn().getPlayer(sessionContext, game)).toThrow(AuthnError);
});
