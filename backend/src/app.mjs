import { WebSocketServer } from 'ws';

import { Config } from './lib/config.mjs';
import { Context } from './lib/context.mjs';

class App extends Context {
  #routes = [
    {
      "handler": (connection, request) => this.#haveGame(connection, request),
      "pattern": /^\/games\/([a-z0-9]+)-([a-z0-9]+)-([a-z0-9]+)$/
    },
    {
      "handler": (connection) => this.#listGames(connection),
      "pattern": /^\/games\/$/
    }
  ];

  #haveGame(connection, parameters) {
    this.gameController.haveGame(connection, parameters[0], parameters[1], parameters[2]);
  }

  #listGames(connection) {
    this.gameController.listGames(connection);
  }

  run() {
    const server = new WebSocketServer({ port: Config.backendPort });

    server.on('connection', (connection, request) => {
      const path = request.url;


      for (const route of this.#routes) {
        const match = route.pattern.exec(path);

        if (match) {
          route.handler(connection, match.slice(1));
          return;
        }
      }

      connection.close();

      /*
      console.log(`connected via ${request.url}`);
    
      connection.send('hello you');
    
      connection.on('close', () => console.log('disconnected'));
    
      connection.on('message', message => {
        console.log('message');
    
        server.clients.forEach(client => {
          client.send(`${message}`);
        });
      });
    
      connection.onerror = function () {
        console.log('error');
      };
      */
    });
  }
}

new App().run();