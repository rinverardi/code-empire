export class NotificationHelper {
    #show(message, style) {
        const notification = document.createElement('div');

        notification.classList.add('notification');
        notification.classList.add(style);
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => notification.remove(), 3000);
    }

    showError(message) {
        this.#show(message, 'notification-error');
    }

    showInformation(message) {
        this.#show(message, 'notification-information');
    }

    showMessage(message) {
        this.#show(message, 'chat-bubble');
    }
}