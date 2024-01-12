/**
 * Providers helper functions for working with arrays.
 */

export class ArrayHelper {

    /**
     * Filters the elements of an array in-place.
     *
     * @param {Array} array the array to filter
     * @param {function} condition whether or not to keep an element
     */

    static filterInPlace(array, condition) {
        let setAt = 0;

        for (let getAt = 0; getAt < array.length; getAt++) {
            const arrayItem = array[getAt];

            if (condition(arrayItem)) {
                array[setAt++] = arrayItem;
            }
        }

        array.length = setAt;
    }

    /**
     * Returns a randomly selected element from an array.
     *
     * @param {Array} array the array to query
     * @returns {*} the array element
     */

    static randomItem(array) {
        return array[Math.floor(Math.random() * array.length)];
    }
}
