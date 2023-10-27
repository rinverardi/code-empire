import { Random } from './random.js';

export class Player {
    static #generateName() {
        const adjective = Random.pickAdjective();
        const animal = Random.pickAnimal();

        return `${adjective[0].toUpperCase()}${adjective.slice(1)} ${animal[0].toUpperCase()}${animal.slice(1)}`;
    }

    static loadId() {
        let id = window.sessionStorage.getItem(Player.Attribute.id);

        if (!id) {
            Player.saveId(id = Random.generateId());
        }

        return id;
    }

    static loadName() {
        let name = window.sessionStorage.getItem(Player.Attribute.name);

        if (!name) {
            Player.saveName(name = Player.#generateName());
        }

        return name;
    }

    static loadSecret() {
        let secret  = window.sessionStorage.getItem(Player.Attribute.secret);

        if (!secret) {
            Player.saveSecret(secret = Random.generateSecret());
        }

        return secret;
    }

    static saveId(id) {
        window.sessionStorage.setItem(Player.Attribute.id, id);
    }

    static saveName(name) {
        window.sessionStorage.setItem(Player.Attribute.name, name);
    }

    static saveSecret(secret) {
        window.sessionStorage.setItem(Player.Attribute.secret, secret);
    }

    static get Attribute() {
        return Object.freeze({
            id: 'playerId',
            name: 'playerName',
            secret: 'playerSecret'
        });
    }

    static get Status() {
        return Object.freeze({
            left: 'left'
        });
    }
};