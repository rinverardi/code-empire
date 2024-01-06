export class Html {
    static escape(value) {
        const element = document.createElement('p');

        element.textContent = value;

        return element.innerHTML;
    }
}
