export class Html {
    static escape(value) {
        const element = document.createElement('p');

        element.textContent = value;

        return element.innerHTML;
    }
}

export class String {
    static parameterize(string, params) {
        return params
            ? string.replace(/{([0-9]+)}/g, (match, index) => params[index])
            : string;
    }
}
