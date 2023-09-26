# Protocol

## Pre-Game Example

### Player «Angry Alpaca»

1. User clicks on «Create game».

2. Location changes to `https://.../frontend/game/#c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`.

	`c1a3...` is the game ID.

	`85a2...` is Angry Alpaca's player ID.

	`cc69...` is Angry Alpaca's player secret.

3. WS connect: `wss://.../backend/game/c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`

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
		    "id": "create",
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
		    "status": "created"
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
		    "status": "created"
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
		    "id": "start",
		  }
		}

10. WS receive:

		{
		  "game": {
		    "id": "c1a39696b19330a2",
		    "status": "started"
		  },
		  "map": {
		    "id": 1,
		    "tiles": [ ... ],
		  },
		  "players": [{
		    "id": "85a27a9f6c4eb393",
		    "name": "Angry Alpaca",
		    "role": "master"
		  }, {
		    "id": "2127b1ce604ae64c",
		    "name": "Brilliant Barracuda",
		    "role": "participant"
		  }],
		  "round": {
		    "number": 1,
		    "player": "85a27a9f6c4eb393",
		    "status": "thinking"
		  }
		}

### Player «Brilliant Barracuda»

1. User clicks on «Join game».

2. Location changes to `navigate /frontend/game/`.

3. WS connect: `wss://.../backend/game/`

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

6. Location changes to `https://.../frontend/game/#c1a39696b19330a2.2127b1ce604ae64c.3e26eff6ea6da984`.

	`c1a3...` is the game ID.

	`2127...` is Brilliant Barracuda's player ID.

	`3e26...` is Brilliant Barracuda's player secret.

7. WS connect: `wss://.../backend/game/c1a39696b19330a2.2127b1ce604ae64c.3e26eff6ea6da984`

8. WS send:

		{
		  "action" {
		    "id": "join_game",
		  },
		  "player": {
		    "name": "Brilliant Barracuda"
		  }
		}

	ws-recv: {
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

	ws-recv: {
	           "game": {
	             "id": "c1a39696b19330a2",
	             "status": "running"
	           },
	           "map": {
	             "id": 1,
	             "tiles": [
	               ···
	             ],
	           },
	           "players": [{
	             "id": "85a27a9f6c4eb393",
	             "name": "Angry Alpaca"
	           }, {
	             "id": "2127b1ce604ae64c",
	             "name": "Brilliant Barracuda"
	           }],
	           "turn": {
	             "player": {
	               "id": "85a27a9f6c4eb393"
	             },
	             "status": "thinking"
	           }
	         }
