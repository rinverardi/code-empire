class Navigation {
    static onClick(id, handler) {
        document.getElementById(id).addEventListener('click', () => window.location = handler());
    }
}