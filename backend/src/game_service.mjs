import { Game } from './game.mjs';
import { GlobalConfig } from './global_config.mjs';
import { Inventory } from './inventory.mjs';
import { Map } from './map.mjs';
import { Player } from './player.mjs';

export class GameService {
    #gameMapper;
    #gameRepository;

    constructor(globalContext) {
        this.#gameMapper = globalContext.gameMapper();
        this.#gameRepository = globalContext.gameRepository();
    }

    async abortGame(sessionContext) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        game.status = Game.Status.aborted;

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async createGame(sessionContext, mapId, playerName) {

        // TODO Check the limit!
        // TODO Check the status!

        const game = {
            id: sessionContext.gameId,
            map: {
                id: mapId
            },
            players: [{
                id: sessionContext.playerId,
                name: playerName,
                role: Player.Role.master,
                status: Player.Status.alive,
                secret: sessionContext.playerSecret
            }],
            status: Game.Status.waiting
        };

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async joinGame(sessionContext, playerName) {

        // TODO Check the limit!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        game.players = game.players.filter(that => that.id !== sessionContext.playerId);

        game.players.push({
            id: sessionContext.playerId,
            name: playerName,
            role: Player.Role.participant,
            status: Player.Status.alive,
            secret: sessionContext.playerSecret
        });

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async leaveGame(sessionContext) {

        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        game.players = game.players.filter(that => that.id !== sessionContext.playerId);

        game.players.push({
            id: sessionContext.playerId,
            status: Player.Status.left
        });

        if (game.players.every(that => that.status === Player.Status.left)) {
            game.status = Game.Status.aborted;
        }

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async loadGame(sessionContext) {
        const game = await this.#gameRepository.loadGame(sessionContext);

        return game
            ? this.#gameMapper.map(sessionContext, game)
            : { status: Game.Status.missing };
    }

    async loadGameList(sessionContext) {
        const gameList = await this.#gameRepository.loadGameList(sessionContext);

        return gameList
            .filter(that => that.status === Game.Status.waiting)
            .map(that => this.#gameMapper.map(sessionContext, that));
    }

    #populate(game) {
        game.status = Game.Status.thinking;

        this.#populateMap(game);
        this.#populateMessages(game);
        this.#populatePlayers(game);
        this.#populateResources(game);
        this.#populateStructures(game);
        this.#populateTurn(game);
    }

    #populateMap(game) {
        game.map.tiles = Map.Template[game.map.id];
    }

    #populateMessages(game) {
        game.messages = []
    }

    #populatePlayers(game) {
        for (const player of game.players) {
            player.health = GlobalConfig.playerHealth;
            player.inventory = {}
            player.position = [2, 1];
            player.visibility = game.map.tiles.map(that => that.replace(/[^ ]/g, Player.Visibility.none));

            for (const item in Inventory.Item) {
                player.inventory[item] = 0;
            }
        }
    }

    #populateResources(game) {
        game.resources = [];

        // TODO Implement me!

    }

    #populateStructures(game) {
        game.structures = [];
    }

    #populateTurn(game) {
        game.turn = {
            number: 1,
            player: game.players[0].id
        }
    }

    async startGame(sessionContext) {

        // TODO Check the access!
        // TODO Check the status!

        const game = await this.#gameRepository.loadGame(sessionContext);

        this.#populate(game);

        await this.#gameRepository.saveGame(sessionContext, game);
        await this.#gameRepository.publishGame(sessionContext, game);
    }

    async watchGame(sessionContext, onUpdate) {
        await this.#gameRepository.subscribeGame(sessionContext, game => {
            const parsedGame = JSON.parse(game);
            const mappedGame = this.#gameMapper.map(sessionContext, parsedGame);

            onUpdate(mappedGame);
        });

        onUpdate(await this.loadGame(sessionContext));
    }

    async watchGameList(sessionContext, onUpdate) {
        await this.#gameRepository.subscribeGameList(sessionContext, async game => {
            const parsedGame = JSON.parse(game);
            const mappedGame = this.#gameMapper.map(sessionContext, parsedGame);

            onUpdate(mappedGame);
        });

        const gameList = await this.loadGameList(sessionContext);

        for (const game of gameList) {
            onUpdate(game);
        }
    }
};