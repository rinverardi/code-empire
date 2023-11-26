run:
	cd src && python3 -m http.server

docker-build:
	docker build -t empire-frontend .

docker-start: docker-build
	docker run -d --name empire-frontend -p 8000:8000 --rm empire-frontend

docker-stop:
	docker stop empire-frontend
