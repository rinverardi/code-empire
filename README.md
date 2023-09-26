# Protokoll

## Pre-Game-Beispiel

### «Angry Alpaca» erstellt das Spiel.

1. Der Benutzer klickt auf «Spiel erstellen».

2. Die aktuelle URL wechselt auf `/frontend/game/#c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`.

	`c1a3...` ist die eindeutige Kennung des Spiels (gameId).

	`85a2...` ist die eindeutige Kennung des Spielers «Angry Alpaca» (playerId).

	`cc69...` ist das Geheimnis des Spielers «Angry Alpaca» (playerSecret).

	Die Kennungen und das Geheimnis werden im Frontend erstellt und beim Öffnen der WebSocket-Verbindung ans Backend übergeben.

3. WS connect to `/backend/game/c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`.

4. WS receive:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "missing"
		   }
		}

5. User clicks on «Next».

6. WS send:

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

7. WS receive:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "pending"
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

8. WS receive:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "pending"
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

9. WS send:

		{
		  "action" {
		    "id": "start-game",
		  }
		}

10. WS receive:

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

### «Brilliant Barracuda» joins the game.

1. User clicks on «Join game».

2. Location changes to `/frontend/game/`.

3. WS connect to `/backend/game/`.

4. WS receive:

		{
		  "games": [{
		    "game": {
		      "id": "c1a39696b19330a2",
		      "status": "pending"
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
		    "status": "pending"
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