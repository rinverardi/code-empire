import { ArrayHelper } from './array_helper.js';

test('Remove all', () => {
    let array = [1, 2, 3];

    ArrayHelper.filterInPlace(array, that => false);

    expect(array.length).toBe(0);
});

test('Retain all', () => {
    let array = [1, 2, 3];

    ArrayHelper.filterInPlace(array, that => true);

    expect(array).toEqual([1, 2, 3]);
});

test('Retain if even', () => {
    let array = [1, 2, 3];

    ArrayHelper.filterInPlace(array, that => that % 2 == 0);

    expect(array).toEqual([2]);
});

test('Retain if odd', () => {
    let array = [1, 2, 3];

    ArrayHelper.filterInPlace(array, that => that % 2 == 1);

    expect(array).toEqual([1, 3]);
});
