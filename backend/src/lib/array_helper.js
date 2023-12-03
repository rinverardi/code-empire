export class ArrayHelper {
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
}
