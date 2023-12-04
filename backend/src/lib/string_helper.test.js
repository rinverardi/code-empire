import { StringHelper } from './string_helper.js';

test('Replace after end', () => {
    expect(StringHelper.replaceAt('abc', 3, 'x')).toBe('abcx');
});

test('Replace at', () => {
    expect(StringHelper.replaceAt('abc', 1, 'x')).toBe('axc');
});

test('Replace at start', () => {
    expect(StringHelper.replaceAt('abc', 0, 'x')).toBe('xbc');
});

test('Replace at end', () => {
    expect(StringHelper.replaceAt('abc', 2, 'x')).toBe('abx');
});

test('Replace before start', () => {
    expect(StringHelper.replaceAt('abc', -1, 'x')).toBe('xabc');
});