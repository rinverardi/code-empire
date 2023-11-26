run: docker-start

docker-start:
	docker run -d --name empire-persistence --network empire -p 127.0.0.1:6379:6379 -p 127.0.0.1:6380:8001 --rm redis/redis-stack:6.2.6-v10

docker-stop:
	docker stop empire-persistence
