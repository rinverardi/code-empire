export class Navigation {
    static onClick(id, handler) {
        document.getElementById(id).addEventListener('click', () => location = handler());
    }
};