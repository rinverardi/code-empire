# Protocol

## Angry Alpaca

1. Click on «Create game»

2. Navigate to `/frontend/game/#c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543`

	`c1a3...` is the game ID

	`85a2...` is Angry Alpaca's player ID

	`cc69...` is Angry Alpaca's player secert

3. WS connect

	wss://···/backend/game/c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543

4. Receive WS message

	{
	  "game": {
	    "id": "c1a39696b19330a2",
	    "status": "missing"
	   }
	}

5. Click «Next»
	click "next"

	ws-send {
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

	ws-recv {
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

	ws-recv {
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

	ws-send {
	          "action" {
	            "id": "start",
	          }
	        }

	ws-recv {
	          "game": {
	            "id": "c1a39696b19330a2",
	            "status": "started"
	          },
	          "map": {
	            "id": 1,
	            "tiles": [
	              ···
	            ],
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

Player "Brilliant Barracuda"
‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
	click "join game"
	‾‾‾‾‾
	navigate /frontend/game/#c1a39696b19330a2.85a27a9f6c4eb393.cc699821b844a543
	‾‾‾‾‾‾‾‾                ^                ^                ^
	                        gameId           playerId         playerSecret

	ws-conn wss://···/backend/
	‾‾‾‾‾‾‾
	ws-recv {
	‾‾‾‾‾‾‾   "games": [{
	            "game": {
	              "id": "c1a39696b19330a2",
	              "status": "pending"
	            },
	            "map": {
	              "id": 1
	            }
	          }]
	        }

	click: join

	set-hash: "" -> #c1a39696b19330a2.2127b1ce604ae64c

	ws-send: {
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
