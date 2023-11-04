import { WebSocketServer } from 'ws';

import { GlobalConfig } from './lib/global_config.mjs';
import { GlobalContext } from './lib/global_context.mjs';
import { Logger } from './lib/logger.mjs';
import { SessionContext as SessionContext } from './lib/session_context.mjs';

class App extends GlobalContext {
  #routes = [
    {
      handler: (wsConnection, wsParams) => this.#handleGame(wsConnection, wsParams),
      pattern: /^\/games\/([a-z0-9]+)-([a-z0-9]+)-([a-z0-9]+)$/
    },
    {
      handler: wsConnection => this.#handleGameList(wsConnection),
      pattern: /^\/games\/$/
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

  run() {
    const wsServer = new WebSocketServer({ port: GlobalConfig.backendPort });

    wsServer.on('connection', (wsConnection, wsRequest) => {
      wsConnection.on('error', wsError => Logger.e('ws', wsError));

      for (const route of this.#routes) {
        const match = route.pattern.exec(wsRequest.url);

        if (match) {
          route.handler(wsConnection, match.slice(1));
          return;
        }
      }

      Logger.w('App.run()', 'Unexpected route');

      wsConnection.close();
    });
  }
}

new App().run();