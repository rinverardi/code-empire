export class Transition {
    static disableFor(element) {
        element.classList.add('no-transition');
    }

    static enableFor(element) {

        // Trigger a reflow to flush the style changes.

        element.offsetHeight;
        element.classList.remove('no-transition');
    }
};
