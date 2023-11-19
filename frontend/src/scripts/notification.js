export class NotificationHelper {
    #show(message) {
        const notification = document.createElement('div');

        notification.classList.add('notification');
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }

    showError(message) {
        this.#show(message);
    }

    showInformation(message) {
        this.#show(message);
    }
}