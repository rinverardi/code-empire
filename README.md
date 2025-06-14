# Empire

In this game, players build up their empires by exploring a map, collecting resources, founding towns and building factories. Opponents can be attacked and destroyed.

## Documentation

The project documentation can be found in the `docs` folder:

    $ xdg-open docs/empire_iteration4_inverardi.pdf

If you have JSDoc installed, the documentation for the JavaScript code can be auto-generated.

Generate and view the documentation for the backend code as follows:

    $ make -C backend docs
    $ xdg-open docs/backend/index.html

Generate and view the documentation for the frontend code as follows:

    $ make -C frontend docs
    $ xdg-open docs/frontend/index.html

## Installation

The following tools must be installed:

1. Docker
2. Node.js 21 (unless you run the backend service with Docker)
3. Python 3 (unless you run the frontend service with Docker)

## Running

To run the game, three services must be started:

1. **Frontend Service**

   The frontend service listens for HTTP connections on [port 8000](http://localhost:8000/).

2. **Backend Service**

   The backend service listens for WS connections on [port 8001](http://localhost:8001/).

3. **Persistence Service**

   The persistence service listens for Redis connections on [port 6379](redis://localhost:6379/).

   The administrative interface is available on [port 6380](http://localhost:6380).

## Running for Development Purposes

### Frontend Service

For development purposes, you can run the frontend service as follows:

    $ cd frontend/src
    $ python3 -m http.server

### Backend Service

For development purposes, you can run the backend service as follows:

    $ export REDIS_URL=redis://localhost:6379
    $ cd backend/src
    $ npm install
    $ npm start

### Persistence Service

For development purposes, you can run the persistence service as follows:

    $ docker run\
        --name empire-persistence\
        -p 127.0.0.1:6379:6379\
        -p 127.0.0.1:6380:8001\
        --rm\
        redis/redis-stack:6.2.6-v10

## Running for Production Purposes

You can run the three services with or without Docker Compose.

If you prefer to use Docker Compose, start the Docker containers with:

    $ docker-compose up [--build]

If you prefer _not_ to use Docker Compose, follow the instruction in the following sections.

### Frontend Service

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

### Backend Service

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

### Persistence Service

Start the Docker container:

    $ docker run\
        -d\
        --name empire-persistence\
        --network empire\
        -p 127.0.0.1:6379:6379\
        -p 127.0.0.1:6380:8001\
        --rm\
        redis/redis-stack:6.2.6-v10
