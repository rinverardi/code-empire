/**
 * This is not a data structure that represents a notification! Rather, it is a
 * container class for notification-related things.
 */

export class Notification {

    /**
     * Defines the notification types.
     * <p>
     * These constants are also defined in the frontend code. If you change any
     * of them, ensure that you apply the same modifications in both places.
     */

    static get Type() {
        return Object.freeze({
            attack: 'attack',
            kill: 'kill'
        });
    }
};
