import { WebSocketServer } from 'ws';

import { GlobalConfig } from './lib/global_config.js';
import { GlobalContext } from './lib/global_context.js';
import { Logger } from './lib/logger.js';
import { SessionContext } from './lib/session_context.js';

/**
 * Acts as the main class of the game.
 */

class App extends GlobalContext {
  #routes = [
    {
      handler: (wsConnection, wsParams) => this.#handleGame(wsConnection, wsParams),
      pattern: /^\/games\/([a-z0-9]+)-([a-z0-9]+)-([a-z0-9]+)$/
    },
    {
      handler: wsConnection => this.#handleGameList(wsConnection),
      pattern: /^\/games\/$/
    },
    {
      handler: wsConnection => this.#handleHighscores(wsConnection),
      pattern: /^\/highscores\/$/
    }
  ];

  async #handleGame(wsConnection, wsParams) {
    try {
      const sessionContext = new SessionContext(wsConnection, wsParams);

      await this.gameController().watchGame(sessionContext);
    } catch (exception) {
      Logger.e('App.handleGame()', exception);
    }
  }

  async #handleGameList(wsConnection) {
    try {
      const sessionContext = new SessionContext(wsConnection);

      await this.gameController().watchGameList(sessionContext);
    } catch (exception) {
      Logger.e('App.handleGameList()', exception);
    }
  }

  async #handleHighscores(wsConnection) {
    try {
      const sessionContext = new SessionContext(wsConnection);

      await this.highscoreController().watchHighscores(sessionContext);
    } catch (exception) {
      Logger.e('App.handleHighscores()', exception);
    }
  }

  /**
   * Acts as the entry point of the game:
   *
   * <ol>
   *   <li>Starts a WebSocket server.
   *   <li>Listens for WebSocket connections.
   *   <li>Dispatches WebSocket connections to controller classes.
   * </ol>
   */

  run() {
    const wsServer = new WebSocketServer({ port: GlobalConfig.backend.port });

    wsServer.on('connection', (wsConnection, wsRequest) => {
      wsConnection.on('error', wsError => Logger.e('ws', wsError));

      for (const route of this.#routes) {
        const match = route.pattern.exec(wsRequest.url);

        if (match) {
          route.handler(wsConnection, match.slice(1));
          return;
        }
      }

      Logger.w('App.run()', 'No such route');

      wsConnection.close();
    });
  }
}

new App().run();
