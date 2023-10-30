export class NotificationHelper {
    show(message) {
        const notification = document.getElementById('notification');

        notification.classList.remove('visible');
        notification.textContent = message;
        notification.classList.add('visible');
    }
}