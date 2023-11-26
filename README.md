# Empire

In this game, players build up their empires by exploring a map, collecting resources, founding towns and building factories. Opponents can be attacked and destroyed.

## Installation

The game consists of three services:

1. Frontend
2. Backend
3. Persistence

### Running the Backend Service

Build the Docker container:

    $ cd backend
    $ docker build -t empire-backend .

Start the Docker container:

    $ docker network create empire || :
    $ docker run\
        -d\
        --init\
        --name empire-backend\
        --network empire\
        -p 8001:8001\
        --rm\
        empire-backend

The backend service listens for WS connections on [localhost:8001](http://localhost:8001/).

### Running the Frontend Service

Build the Docker container:

    $ cd frontend
    $ docker build -t empire-frontend .

Start the Docker container:

    $ docker run\
        -d\
        --name empire-frontend\
        -p 8000:8000\
        --rm\
        empire-frontend

The frontend service listens for HTTP connections on [localhost:8000](http://localhost:8000/).

### Running the Persistence Service

Start the Docker container:

    $ docker run\
        -d\
        --name empire-persistence\
        --network empire\
        -p 127.0.0.1:6379:6379\
        -p 127.0.0.1:6380:8001\
        --rm\
        redis/redis-stack:6.2.6-v10

The persistence service listens for Redis connections on [port 6379](redis://localhost:6379/). The web interface is available on [port 6380](http://localhost:6380).
