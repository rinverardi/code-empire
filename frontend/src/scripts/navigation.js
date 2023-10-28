export class Navigation {
    wireClick(id, handler) {
        document.getElementById(id).addEventListener('click', () => {
            const location = handler();

            if (location) {
                window.location = location;
            }
        });
    }
};