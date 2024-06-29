VERSION ?= $(shell git describe --tags --always)

-include .env
export

login-github:
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is not set)
endif
	docker login ghcr.io -u default -p $(GITHUB_TOKEN)

init:
	cp .env.example .env
	cp app-config.example.yaml app-config.local.yaml

install:
ifneq ($(shell which asdf),)
	asdf install
	corepack enable
	corepack prepare yarn@4.3.1 --activate
	asdf reshim nodejs
endif
	yarn install

test: install
	yarn test

dev: install
	@echo "Starting the server at http://localhost:3000"
	yarn dev

dev-app:
	yarn workspace app start

dev-backend:
	yarn workspace backend start

docker-dev:
	docker compose up

logs:
	docker compose logs -f

exec:
	docker compose exec backstage bash

up:
	@echo "Starting the server at http://localhost:7007"
	docker compose up -d
	open http://localhost:7007

down:
	docker compose down

build:
	docker compose build backstage

publish: login-github
	docker compose build --push backstage
	VERSION=latest docker compose build --push backstage
