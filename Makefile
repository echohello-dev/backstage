-include .env
export

-include .env.secrets
export

login: login-kubernetes login-github

login-kubernetes: decrypt-kubeconfig
	@echo "Install Kubeconfig to host"
	mkdir -p $(HOME)/.kube
	touch $(HOME)/.kube/config
	cp $(HOME)/.kube/config $(HOME)/.kube/config.bak
	kubectl config delete-cluster $(KUBE_CLUSTER_NAME) || true
	kubectl config delete-context $(KUBE_CLUSTER_NAME) || true
	kubectl config unset users.$(KUBE_CLUSTER_NAME) || true
	KUBECONFIG=$(HOME)/.kube/config:./.kube/config kubectl config view --flatten > $(HOME)/.kube/config.tmp
	mv $(HOME)/.kube/config.tmp $(HOME)/.kube/config
	chmod 600 $(HOME)/.kube/config
	kubectl config use-context $(KUBE_CLUSTER_NAME)

login-github:
	@echo "Login to GitHub"
	docker login ghcr.io -u $(GITHUB_USERNAME) -p $(GITHUB_TOKEN)

init: decrypt-env
	cp .env.example .env
	cp app-config.example.yaml app-config.local.yaml

install:
	yarn install --immutable

test: install
	yarn test

dev: install
	@echo "Starting the server at http://localhost:3000"
	yarn dev

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

push: login-github
	docker compose build --push backstage

deploy: login
	@echo "Deploying to Kubernetes"
	skaffold run

encrypt: encrypt-kubeconfig encrypt-env encrypt-chart

encrypt-env:
	@echo "Encrypting environment variable file"
	sops --input-type dotenv --output-type dotenv -e .env.secrets > .env.secrets.enc

encrypt-chart:
	helm secrets enc chart/secrets.prod.yaml

encrypt-kubeconfig:
	@echo "Encrypting Kubeconfig"
	sops --input-type binary --output-type binary -e .kube/config > .kube/config.enc

decrypt: decrypt-kubeconfig decrypt-env decrypt-chart

decrypt-env:
	@echo "Decrypting .env.secrets file"
	sops \
		--input-type dotenv \
		--output-type dotenv \
		-d .env.secrets.enc \
		>.env.secrets
	@echo
	@echo "Done!"

decrypt-chart:
	helm secrets dec chart/secrets.prod.yaml

decrypt-kubeconfig:
	@echo "Decrypting Kubeconfig"
	sops --input-type binary --output-type binary -d .kube/config.enc > .kube/config
