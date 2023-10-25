import { WebSocketServer } from 'ws';

import { SessionContext as SessionContext } from './lib/session_context.mjs';
import { GlobalConfig } from './lib/global_config.mjs';
import { GlobalContext } from './lib/global_context.mjs';

class App extends GlobalContext {
  #routes = [
    {
      handler: (wsConnection, wsParams) => this.#handleGame(wsConnection, wsParams),
      pattern: /^\/games\/([a-z0-9]+)-([a-z0-9]+)-([a-z0-9]+)$/
    },
    {
      handler: (wsConnection) => this.#handleGameList(wsConnection),
      pattern: /^\/games\/$/
    }
  ];

  async #handleGame(wsConnection, wsParams) {
    const sessionContext = await this.playerAuthentication().authenticate(wsConnection, wsParams);

    this.gameController().watchGame(sessionContext);
  }

  #handleGameList(connection) {
    const sessionContext = new SessionContext(connection);

    this.gameController().watchGameList(sessionContext);
  }

  run() {
    const server = new WebSocketServer({ port: GlobalConfig.backendPort });

    server.on('connection', async (wsConnection, wsRequest) => {

      // TODO Remove me!

      wsConnection.on('close', () => console.log('[ws-close]'));
      wsConnection.on('error', error => console.log(`[ws-error] ${error}`));
      wsConnection.on('message', message => console.log(`[ws-message] ${message}`));

      for (const route of this.#routes) {
        const match = route.pattern.exec(wsRequest.url);

        if (match) {
          route.handler(wsConnection, match.slice(1));
          return;
        }
      }

      wsConnection.close();
    });
  }
}

new App().run();