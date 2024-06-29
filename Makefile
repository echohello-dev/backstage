COMMIT_COUNT := $(shell git rev-list --count HEAD)
VERSION := $(shell date +"%Y.%m.%d-${COMMIT_COUNT}")

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

version:
	@echo "$(VERSION)"

release:
	git tag -a ${VERSION} -m "Release ${VERSION}"
	git push origin ${VERSION}
	gh release create ${VERSION} \
		--title "${VERSION}" \
		--generate-notes
	@echo "Version ${VERSION} has been tagged, pushed, and released on GitHub."

undo-release:
	git tag -d ${VERSION}
	git push origin :refs/tags/${VERSION}
	gh release delete ${VERSION}

help:
	@echo "Available commands:"
	@echo "  init: Initialize the project"
	@echo "  install: Install dependencies"
	@echo "  test: Run tests"
	@echo "  dev: Start the development server"
	@echo "  dev-app: Start the app development server"
	@echo "  dev-backend: Start the backend development server"
	@echo "  docker-dev: Start the development server using Docker"
	@echo "  logs: Show logs"
	@echo "  exec: Execute a command in the backstage container"
	@echo "  up: Start the server"
	@echo "  down: Stop the server"
	@echo "  build: Build the Docker image"
	@echo "  publish: Build and publish the Docker image"
	@echo "  version: Show the current version"
	@echo "  release: Tag, push, and release a new version"
	@echo "  undo-release: Delete a release"