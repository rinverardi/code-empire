# Protocol

## Pre-Game Example

### «Angry Alpaca» creates the game.

1. User clicks on «Create game».

2. Location changes to `/frontend/game/#c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`.

	`c1a3...` is the game ID.

	`85a2...` is Angry Alpaca's player ID.

	`cc69...` is Angry Alpaca's player secret.

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
		    "id": "create_game",
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
		    "id": "start_game",
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
		    "id": "execute_turn",
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