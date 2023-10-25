class Random {
    static #generate(length) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz012345';
        const integers = new Int8Array(length);

        crypto.getRandomValues(integers)

        return Array.from(integers, that => alphabet[that & 31]).join('');
    }

    static generateId() {
        return this.#generate(8);
    }

    static generateSecret() {
        return this.#generate(32);
    }
}