run-dev:
	docker compose -f ".docker/docker-compose-dev.yml" -p "sparcs-newbie-project-dev" up -d

stop-dev:
	docker compose -f ".docker/docker-compose-dev.yml" -p "sparcs-newbie-project-dev" down
