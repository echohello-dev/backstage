# [Backstage](https://backstage.io)

## Getting Started

Copy local environment files from the example files.

```bash
make init
```

Start the Backstage server.

```bash
make dev
```

## Development

Installs the Kubeconfig to the host after decrypting it.

```bash
make login-kubernetes
```

Logs into GitHub's Docker registry using the provided GitHub username and token.

```bash
make login-github
```

Copies the example environment and application configuration files to actual configuration files after decrypting the environment.

```bash
make init
```

Installs the required Python and Node.js versions if they are not already installed, and then installs the necessary JavaScript packages.

```bash
make install
```

Starts the server at http://localhost:3000 after installing the necessary packages.

```bash
make dev
```

Starts the server at http://localhost:7007 and opens this URL in the default web browser. It then starts the Docker Compose services in detached mode.

```bash
make up
```

Stops and removes the Docker Compose services.

```bash
make down
```

Builds the Docker Compose service named "backstage".

```bash
make build
```

Builds and pushes the Docker Compose service named "backstage" after logging into GitHub.

```bash
make push
```

Deploys the application using Skaffold after logging into Kubernetes.

```bash
make deploy
```

Encrypts the environment variable file `.env.secrets` using SOPS and saves the encrypted content to `.env.secrets.enc`.

```bash
make encrypt-env
```

Encrypts the Helm chart secrets file `chart/secrets.prod.yaml` using Helm secrets.

```bash
make encrypt-chart
```

Decrypts the `.env.secrets.enc` file using SOPS and saves the decrypted content to `.env.secrets`.

```bash
make decrypt-env
```

Decrypts the `.kube/config.enc` file using SOPS and saves the decrypted content to `.kube/config`.

```bash
make decrypt-kubeconfig
```

## Upgrading Backstage

```bash
yarn backstage-cli versions:bump
```

[Reference](https://backstage.io/docs/getting-started/keeping-backstage-updated/)

## Configuration API Reference

Use the following command to get the configuration API reference.

```bash
yarn backstage-cli config:docs
```

## Development

- [Loading Configuration](https://backstage.io/docs/conf/reading)
- [New Backend System](https://backstage.io/docs/backend-system/)
- [Migrating to New Auth Services](https://backstage.io/docs/tutorials/auth-service-migration/)
- [Custom App Theme](https://backstage.io/docs/getting-started/app-custom-theme/)
