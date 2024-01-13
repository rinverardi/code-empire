/**
 * This is not a data structure that represents a notification! Rather, it is a
 * container class for notification-related things.
 */

export class Notification {

    /**
     * The notification types that are supported.
     */

    static get Type() {
        return Object.freeze({
            attack: 'attack',
            kill: 'kill'
        });
    }
};
