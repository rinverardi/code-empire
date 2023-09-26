# Protokoll

## Pre-Game-Beispiel

### «Angry Alpaca» erstellt das Spiel.

1. Der Spieler klickt auf «Spiel erstellen».

2. Die URL im Browser wechselt auf `/frontend/game/#c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`.

	`c1a3...` ist die `game.id` und dient dazu, das Spiel zu identifizieren.

	`85a2...` ist die `player.id` und dient dazu, den Spieler zu identifizieren.

	`cc69...` ist das `player.secret` und wird in der Folge vom Backend verwendet, um den Spieler zu authentifizieren. Dieser Wert ist geheim und darf nicht mit anderen Spielern geteilt werden.

	Die drei Werte werden vom Frontend zufällig gewählt und in der aktuellen URL als Fragment gesetzt, damit sie einen Reload der Seite überleben.

3. Das Frontend öffnet eine WebSocket-Verbindung zu `/backend/game/c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`.

    Die drei zuvor erzeugten Werte werden beim Öffnen der WebSocket-Verbindung an das Backend übergeben.

4. Das Frontend empfängt eine WebSocket-Nachricht:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "missing"
		   }
		}

	Der Spielstatus `game.status == "missing"` zeigt an, dass Spiel noch nicht existiert.

5. Der Spieler klickt auf «Weiter».

6. Das Frontend sendet eine WebSocket-Nachricht:

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

	Das Backend erstellt das Spiel.

7. Das Frontend empfängt eine WebSocket-Nachricht:

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

	Der Spielstatus `waiting` zeigt an, dass auf weitere Spieler gewartet wird.

8. Das Frontend empfängt eine WebSocket-Nachricht:

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

	Der Spieler «Brilliant Barracuda» nimmt ebenfalls am Spiel teil.

9. Der Spieler klickt auf «Spiel starten».

10. Das Frontend sendet eine WebSocket-Nachricht:

		{
		  "action" {
		    "id": "start-game",
		  }
		}

11. Das Frontend erhält eine WebSocket-Nachricht:

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

	Der Spielstatus `game.status == "thinking"` zeigt an, dass der aktuelle Spieler `turn.player == "85a27a9f6c4eb393"` am Zug ist.

### «Brilliant Barracuda» joins the game.

1. User clicks on «Join game».

2. Location changes to `/frontend/game/`.

3. WS connect to `/backend/game/`.

4. WS receive:

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

5. User clicks on «Next».

6. Location changes to `/frontend/game/#c1a39696b19330a2.2127b1ce604ae64c.3e26eff6ea6da984`.

	`c1a3...` is the game ID.

	`2127...` is Brilliant Barracuda's player ID.

	`3e26...` is Brilliant Barracuda's player secret.

7. WS connect to `/backend/game/c1a39696b19330a2.2127b1ce604ae64c.3e26eff6ea6da984`.

8. WS send:

		{
		  "action" {
		    "id": "join",
		  },
		  "player": {
		    "name": "Brilliant Barracuda"
		  }
		}

9. WS receive:

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

10. WS receive:

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

## In-Game Example

### «Angry Alpaca» executes a «move» turn.

1. WS send:

		{
		  "action" {
		    "id": "execute-turn",
		  },
		  "turn": {
		    "direction": "north-east",
		    "type": "move"
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
			"direction": "north-east",
		    "number": 1,
		    "player": "85a27a9f6c4eb393",
		    "type": "move"
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