/**
 * Provides helper functions for CSS transitions.
 */

export class Transition {

    /**
     * Disables CSS transitions for an HTML element.
     * <p>
     * This means that transitions that would normally be animated are
     * executed immediately.
     *
     * @param {object} element the HTML element
     */

    static disableFor(element) {
        element.classList.add('no-transition');
    }

    /**
     * Enables CSS transitions for an HTML element.
     *
     * @param {object} element the HTML element
     */

    static enableFor(element) {

        // Trigger a reflow to flush the style changes.

        element.offsetHeight;
        element.classList.remove('no-transition');
    }
};
