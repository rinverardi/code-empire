.PHONY: doc

run: npm-start

clean:
	rm -fr ../docs/backend

docs:
	jsdoc -d ../docs/backend src/*.js src/*/*.js

docker-build:
	docker build -t empire-backend .

docker-start: docker-build
	docker network create empire || :
	docker run -d --init --name empire-backend --network empire -p 8001:8001 --rm empire-backend

docker-stop:
	docker stop empire-backend

npm-install:
	cd src && npm install

npm-start: npm-install
	cd src && npm start
