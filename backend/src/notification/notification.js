/**
 * This is not a data structure that represents a notification! Rather, it is a
 * container class for notification-related things.
 */

export class Notification {

    /**
     * Defines the notification types.
     */

    static get Type() {
        return Object.freeze({
            attack: 'attack',
            kill: 'kill'
        });
    }
};
