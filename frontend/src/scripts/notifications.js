export class NotificationHelper {
    #show(message, messageClass) {
        const notification = document.createElement('div');

        notification.classList.add('notification');
        notification.classList.add(messageClass);

        notification.textContent = message;

        const body = document.getElementsByTagName('body')[0];

        body.appendChild(notification);
    }

    showError(message) {
        this.#show(message, 'is-error');
    }

    showInformation(message) {
        this.#show(message, 'is-information');
    }
}