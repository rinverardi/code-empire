export class StringHelper {
    static replaceAt(string, index, character) {
        return string.substring(0, index) + character + string.substring(index + 1);
    }
}
