COMMIT_COUNT := $(shell git rev-list --count HEAD)
CALENDAR_VERSION := $(shell date +"%Y.%m")
VERSION := $(shell echo "${CALENDAR_VERSION}-${COMMIT_COUNT}")

-include .env
export

login-github:
ifndef GITHUB_TOKEN
	$(error GITHUB_TOKEN is not set)
endif
	docker login ghcr.io -u default -p $(GITHUB_TOKEN)

init:
	cp -n .env.example .env || true
	cp -n app-config.example.yaml app-config.local.yaml || true

install: init
ifneq ($(shell which asdf),)
	asdf install
	corepack enable
	corepack prepare yarn@4.3.1 --activate
	asdf reshim nodejs
endif
	yarn install

lint: install
	yarn lint:all
	yarn tsc

test: install
	yarn test

dev: install
	@echo "Starting the server at http://localhost:3000"
	yarn dev

dev-app:
	yarn workspace app start

dev-backend:
	yarn workspace backend start

dev-docker:
	@echo "Starting the server at http://localhost:7007"
	docker compose up

logs:
	docker compose logs -f

exec:
	docker compose exec backstage bash

plausible-up: init
	@echo "Plausible is running at http://localhost:8000 or http://plausible.localhost"
	docker compose -f compose.plausible.yaml up -d

plausible-down:
	docker compose -f compose.plausible.yaml down

up: init
	@echo "Backstage is running at http://localhost:7007 or http://backstage.localhost"
	@echo "Traefik is running at http://localhost:8080 or http://traefik.localhost"
	docker compose up -d

down:
	docker compose down

run:
	docker compose run --rm backstage $(filter-out $@,$(MAKECMDGOALS))

build: init
	docker compose build backstage

publish: init login-github version
	docker compose build --push backstage
	VERSION=latest docker compose build --push backstage

version:
	@echo "$(VERSION)"
ifdef CI
	@echo "# 📦 Version" >> ${GITHUB_STEP_SUMMARY}
	@echo "Copy the following version to the \`VERSION\` variable as the Docker image tag." >> ${GITHUB_STEP_SUMMARY}
	@echo "\`\`\`" >> ${GITHUB_STEP_SUMMARY}
	@echo "${VERSION}" >> ${GITHUB_STEP_SUMMARY}
	@echo "\`\`\`" >> ${GITHUB_STEP_SUMMARY}
	@echo "" >> ${GITHUB_STEP_SUMMARY}
endif

release: version
ifdef CI
	git config --global user.email "actions@github.com"
	git config --global user.name "GitHub Actions"
endif
	git tag -a ${VERSION} -m "Release ${VERSION}"
	git push origin ${VERSION}
	gh release create ${VERSION} \
		--title "${VERSION}" \
		--generate-notes \
		--target main

undo-release:
	git tag -d ${VERSION}
	git push origin :refs/tags/${VERSION}
	gh release delete -y ${VERSION}

gh-release:
	gh workflow run release.yml

help:
	@echo "Available commands:"
	@echo "  init: Initialize the project"
	@echo "  install: Install dependencies"
	@echo "  lint: Run linting and type checking"
	@echo "  test: Run tests"
	@echo "  dev: Start the development server"
	@echo "  dev-app: Start the app development server"
	@echo "  dev-backend: Start the backend development server"
	@echo "  dev-docker: Start the development server using Docker"
	@echo "  logs: Show logs"
	@echo "  exec: Execute a command in the backstage container"
	@echo "  up: Start the server"
	@echo "  down: Stop the server"
	@echo "  run: Run a command in the backstage container"
	@echo "  build: Build the Docker image"
	@echo "  publish: Build and publish the Docker image"
	@echo "  version: Show the current version"
	@echo "  release: Tag, push, and release a new version"
	@echo "  undo-release: Delete a release"