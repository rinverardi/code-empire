export class Player {
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

export class PlayerBuilder {
    build(source) {
        const target = document.createElement('img');

        target.classList.add('player');

        target.src = 'images/player.svg';

        target.style.left = `${source.position[0] * 40 + 40}px`;
        target.style.top = `${source.position[1] * 45 + 20}px`;

        return target;
    }
}

export class PlayerHelper {
    #random;

    constructor(context) {
        this.#random = context.random();
    }

    #generateName() {
        const adjective = this.#random.pickAdjective();
        const animal = this.#random.pickAnimal();

        return `${adjective[0].toUpperCase()}${adjective.slice(1)} ${animal[0].toUpperCase()}${animal.slice(1)}`;
    }

    loadId() {
        let id = window.sessionStorage.getItem(Player.Attribute.id);

        if (!id) {
            this.saveId(id = this.#random.generateId());
        }

        return id;
    }

    loadName() {
        let name = window.sessionStorage.getItem(Player.Attribute.name);

        if (!name) {
            this.saveName(name = this.#generateName());
        }

        return name;
    }

    loadSecret() {
        let secret = window.sessionStorage.getItem(Player.Attribute.secret);

        if (!secret) {
            this.saveSecret(secret = this.#random.generateSecret());
        }

        return secret;
    }

    saveId(id) {
        window.sessionStorage.setItem(Player.Attribute.id, id);
    }

    saveName(name) {
        window.sessionStorage.setItem(Player.Attribute.name, name);
    }

    saveSecret(secret) {
        window.sessionStorage.setItem(Player.Attribute.secret, secret);
    }
}