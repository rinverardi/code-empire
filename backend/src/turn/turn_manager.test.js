import { GlobalContext } from "../lib/global_context.js";
import { Turn } from "./turn.js";

class TestContext extends GlobalContext {
    gameAccess() {
        return {
            getCurrentPlayer: (game) => ({
                position: [2, 1]
            })
        };
    }
}

test('Can move', () => {
    const testContext = new TestContext();

    const game = {
        map: {
            tiles: [
                ' g g ',
                'g g g',
                ' g g '
            ]
        },
        players: []
    };

    testContext.turnManager().startTurn(game);

    // The player can move in all directions.

    const turns = game.turns.filter(that => that.type === Turn.Type.move);

    expect(turns.length).toBe(6);
});

test('Cannot step on opponent', () => {
    const testContext = new TestContext();

    const game = {
        map: {
            tiles: [
                ' g g ',
                'g g g',
                ' g g '
            ]
        },
        players: [{
            position: [0, 1]
        }]
    };

    testContext.turnManager().startTurn(game);

    // The player can move in all directions but west.

    const turns = game.turns.filter(that => that.type === Turn.Type.move);

    expect(turns.length).toBe(5);
});

test('Cannot walk on mountain', () => {
    const textContext = new TestContext();

    const game = {
        map: {
            tiles: [
                ' g g ',
                'm g g',
                ' g g '
            ]
        },
        players: []
    };

    textContext.turnManager().startTurn(game);

    // The player can move in all directions but west.

    const turns = game.turns.filter(that => that.type === Turn.Type.move);

    expect(game.turns.length).toBe(5);
});

test('Cannot walk on water', () => {
    const testContext = new TestContext();

    const game = {
        map: {
            tiles: [
                ' g g ',
                'w g g',
                ' g g '
            ]
        },
        players: []
    };

    testContext.turnManager().startTurn(game);

    // The player can move in all directions but west.

    const turns = game.turns.filter(that => that.type === Turn.Type.move);

    expect(game.turns.length).toBe(5);
});
