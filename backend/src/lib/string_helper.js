/**
 * Providers helper functions for working with strings.
 */

export class StringHelper {

    /**
     * Replaces a character in a string.
     *
     * @param {string} string the old string
     * @param {number} index the index of the character
     * @param {string} character the value for the character
     * @returns {string} the new string
     */

    static replaceAt(string, index, character) {
        return string.substring(0, index) + character + string.substring(index + 1);
    }
}
