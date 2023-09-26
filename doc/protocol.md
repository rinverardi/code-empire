# Protokoll

## Pre-Game-Beispiel

### «Angry Alpaca» erstellt das Spiel.

1. Der Spieler klickt auf «Spiel erstellen».

2. Die URL im Browser wechselt auf `/frontend/game/#c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`.

	`c1a3...` ist der Wert `game.id` und dient dazu, das Spiel zu identifizieren.

	`85a2...` ist der Wert `player.id` und dient dazu, den Spieler zu identifizieren.

	`cc69...` ist der Wert `player.secret` und wird in der Folge vom Backend verwendet, um den Spieler zu authentifizieren. Dieser Wert ist geheim und darf nicht an andere Spieler weitergegeben werden.

	Die drei Werte werden vom Frontend zufällig gewählt und in der aktuellen URL als Fragment gesetzt, damit sie bei einen Reload der Seite nicht veloren gehen.

3. Das Frontend öffnet eine WebSocket-Verbindung zu `/backend/game/c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`.

    Die drei zuvor erzeugten Werte werden beim Öffnen der WebSocket-Verbindung an das Backend übergeben.

4. Das Frontend empfängt eine WebSocket-Nachricht vom Backend:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "missing"
		   }
		}

	Der Wert `game.status == "missing"` zeigt an, dass Spiel noch nicht existiert.

5. Der Spieler klickt auf «Weiter».

6. Das Frontend sendet eine WebSocket-Nachricht an das Backend:

		{
		  "action" {
		    "id": "create-game",
		  },
		  "map": {
		    "id": 1
		  },
		  "player": {
		    "name": "Angry Alpaca"
		  }
		}

	Aufgrund der Aktion `action.id == "create-game"` erstellt das Backend das Spiel.

7. Das Frontend empfängt eine WebSocket-Nachricht vom Backend:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "waiting"
		  },
		  "map": {
		    "id": 1
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
		    "name": "Angry Alpaca",
		    "role": "master"
		  }],
		}

	Der Wert `game.status == "waiting"` zeigt an, dass auf weitere Spieler gewartet wird.

8. Das Frontend empfängt eine WebSocket-Nachricht vom Backend:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "waiting"
		  },
		  "map": {
		    "id": 1
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
		    "name": "Angry Alpaca",
		    "role": "master"
		  }, {
		    "id": "2127b1ce604ae64c",
		    "name": "Brilliant Barracuda",
		    "role": "participant"
		  }]
		}

	Ein weiterer Spieler «Brilliant Barracuda» tritt dem Spiel bei.

9. Der Spieler klickt auf «Spiel starten».

10. Das Frontend sendet eine WebSocket-Nachricht an das Backend:

		{
		  "action" {
		    "id": "start-game",
		  }
		}

	Aufgrund der Aktion `action.id == "start-game"` startet das Backend das Spiel.

11. Das Frontend erhält eine WebSocket-Nachricht vom Backend:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "thinking"
		  },
		  "map": {
		    "id": 1,
		    "tiles": [ ... ],
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
			"inventory": { ... },
		    "name": "Angry Alpaca",
		    "role": "owner"
		  }, {
		    "id": "2127b1ce604ae64c",
			"inventory": { ... },
		    "name": "Brilliant Barracuda",
		    "role": "participant"
		  }],
		  "turn": {
		    "number": 1,
		    "player": "85a27a9f6c4eb393"
		  }
		}

	Der Wert `game.status == "thinking"` zeigt an, dass das Spiel gestartet wurde und der aktuelle Spieler `turn.player == "85a27a9f6c4eb393"` am Zug ist.

### «Brilliant Barracuda» nimmt am Spiel teil.

1. Der Spieler klickt auf «Spiel beitreten».

2. Die URL im Browser wechselt auf `/frontend/game/`.

3. Das Frontend öffnet eine WebSocket-Verbindung zu `/backend/game/`.

4. Das Frontend empfängt eine WebSocket-Nachricht vom Backend:

		{
		  "games": [{
		    "game": {
		      "id": "c1a39696b19330a2",
		      "status": "waiting"
		    },
		    "map": {
		      "id": 1
		    }
		  }]
		}

	Der Wert `game.status == "waiting"` zeigt an, dass auf weitere Spieler gewartet wird.

5. Der Spieler klickt auf «Weiter.

6. Die URL im Browser wechselt auf `/frontend/game/#c1a39696b19330a2.2127b1ce604ae64c.3e26eff6ea6da984`.

	`c1a3...` ist der Wert `game.id` und dient dazu, das Spiel zu identifizieren.

	`2127...` ist der Wert `player.id` und dient dazu, den Spieler zu identifizieren.

	`3e26...` ist der Wert `player.secret` und wird in der Folge vom Backend verwendet, um den Spieler zu authentifizieren. Dieser Wert ist geheim und darf nicht an andere Spieler weitergegeben werden.

	Die drei Werte werden vom Frontend zufällig gewählt und in der aktuellen URL als Fragment gesetzt, damit sie bei einen Reload der Seite nicht veloren gehen.

7. Das Frontend öffnet eine WebSocket-Verbindung zu `/backend/game/c1a39696b19330a2.2127b1ce604ae64c.3e26eff6ea6da984`.

8. Das Frontend sendet eine WebSocket-Nachricht an das Backend:

		{
		  "action" {
		    "id": "join-game",
		  },
		  "player": {
		    "name": "Brilliant Barracuda"
		  }
		}

	Aufgrund der Aktion `action.id == "join-game"` fügt das Backend den Spieler zum Spiel hinzu.

9. Das Frontend empfängt eine WebSocket-Nachricht vom Backend:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "waiting"
		  },
		  "map": {
		    "id": 1
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
		    "name": "Angry Alpaca"
		  }, {
		    "id": "2127b1ce604ae64c",
		    "name": "Brilliant Barracuda"
		  }]
		}

	Der Wert `game.status == "waiting"` zeigt an, dass auf weitere Spieler gewartet wird.

10. Das Frontend empfängt eine WebSocket-Nachricht vom Backend:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "thinking"
		  },
		  "map": {
		    "id": 1,
		    "tiles": [ ··· ],
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
			"inventory": { ... },
		    "name": "Angry Alpaca",
			"role": "owner",
		  }, {
		    "id": "2127b1ce604ae64c",
			"inventory": { ... },
		    "name": "Brilliant Barracuda",
			"role": "participant"
		  }],
		  "turn": {
		    "number": 1,
		    "player": "85a27a9f6c4eb393"
		  }
		}

	Der Wert `game.status == "thinking"` zeigt an, dass das Spiel gestartet wurde und der aktuelle Spieler `turn.player == "85a27a9f6c4eb393"` am Zug ist.

## In-Game-Beispiel

### «Angry Alpaca» führt einen Zug aus.

1. Der Spieler bewegt seine Figur um ein Feld nach Nord-Osten.

2. Das Frontend sendet eine WebSocket-Nachricht an das Backend:

		{
		  "action" {
		    "id": "execute-turn",
		  },
		  "turn": {
		    "direction": "north-east",
		    "type": "move"
		  }
		}

	Aufgrund der Aktion `action.id == "execute-turn"` führt das Backend den Zug aus.

2. Das Frontend empfängt eine WebSocket-Nachricht vom Backend:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "executing"
		  },
		  "map": {
		    "id": 1,
		    "tiles": [ ··· ],
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
			"inventory": { ... },
		    "name": "Angry Alpaca",
			"role": "owner",
		  }, {
		    "id": "2127b1ce604ae64c",
			"inventory": { ... },
		    "name": "Brilliant Barracuda",
			"role": "participant"
		  }],
		  "turn": {
			"direction": "north-east",
		    "number": 1,
		    "player": "85a27a9f6c4eb393",
		    "type": "move"
		  }
		}

	Der Wert `game.status == "executing"` zeigt an, dass gerade ein Zug ausgeführt wird. Das Frontend kann die Details im Ast `turn` nutzen, um den Zug animiert darzustellen.

3. Das Frontend empfängt eine WebSocket-Nachricht vom Backend:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "thinking"
		  },
		  "map": {
		    "id": 1,
		    "tiles": [ ··· ],
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
			"inventory": { ... },
		    "name": "Angry Alpaca",
			"role": "owner",
		  }, {
		    "id": "2127b1ce604ae64c",
			"inventory": { ... },
		    "name": "Brilliant Barracuda",
			"role": "participant"
		  }],
		  "turn": {
		    "number": 2,
		    "player": "2127b1ce604ae64c"
		  }
		}

### «Brilliant Baracude» executes a «build village» turn.

1. WS send:

		{
		  "action" {
		    "id": "execute-turn",
		  },
		  "turn": {
		    "type": "build-village"
		  }
		}

2. WS receive:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "executing"
		  },
		  "map": {
		    "id": 1,
		    "tiles": [ ··· ],
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
			"inventory": { ... },
		    "name": "Angry Alpaca",
			"role": "owner",
		  }, {
		    "id": "2127b1ce604ae64c",
			"inventory": { ... },
		    "name": "Brilliant Barracuda",
			"role": "participant"
		  }],
		  "turn": {
		    "number": 2,
		    "player": "85a27a9f6c4eb393",
		    "type": "build-village"
		  }
		}

3. WS receive:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "thinking"
		  },
		  "map": {
		    "id": 1,
		    "tiles": [ ··· ],
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
			"inventory": { ... },
		    "name": "Angry Alpaca",
			"role": "owner",
		  }, {
		    "id": "2127b1ce604ae64c",
			"inventory": { ... },
		    "name": "Brilliant Barracuda",
			"role": "participant"
		  }],
		  "turn": {
		    "number": 3,
		    "player": "85a27a9f6c4eb393"
		  }
		}