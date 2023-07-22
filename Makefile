run-dev:
	docker compose -f ".docker/docker-compose-dev.yml" -p "madcamp-week4-db" up -d

stop-dev:
	docker compose -f ".docker/docker-compose-dev.yml" -p "madcamp-week4-db" down
