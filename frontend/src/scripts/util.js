/**
 * Provides helper functions for working with HTML elements.
 */

export class Html {

    /**
     * Applies HTML-encoding to a string.
     *
     * @param {string} value the unencoded string
     * @returns {string} the encoded string
     */

    static escape(value) {
        const element = document.createElement('p');

        element.textContent = value;

        return element.innerHTML;
    }
}

/**
 * Provides helper functions for working with strings.
 */

export class String {

    /**
     * Processes a string template and replaces the contained placeholders with
     * the corresponding parameters.
     *
     * @param {string} string the string template
     * @param {Array} params the string parameters
     * @returns {string} the processed string
     */

    static parameterize(string, params) {
        return params
            ? string.replace(/{([0-9]+)}/g, (match, index) => params[index])
            : string;
    }
}
