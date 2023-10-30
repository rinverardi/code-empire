export class Navigation {
    wireClick(control, handler) {
        document.getElementById(control).addEventListener('click', () => {
            const location = handler();

            if (location) {
                window.location = location;
            }
        });
    }

    wirePopup(controlOpen, controlClose, popup) {
        document.getElementById(controlOpen).addEventListener('click', () => {
            const element = document.getElementById(popup);

            element.classList.add('open');
            element.style.visibility = 'visible';
        });

        document.getElementById(controlClose).addEventListener('click', () => {
            const element = document.getElementById(popup);

            element.classList.remove('open');

            setTimeout(() => element.style.visibility = 'hidden', 500);
        });
    }
};