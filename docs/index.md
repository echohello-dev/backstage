# Backstage

## 🚀 Getting Started

To run the Backstage Showcase locally:

1. Clone the repository
   ```
   git clone https://github.com/echohello-dev/backstage.git
   ```
2. Install dependencies
   ```
   make install
   ```
3. Start the app
   ```
   make dev
   ```
4. Open [`localhost:3000`](http://localhost:3000) in your browser

## 🧑‍💻 Development

Common development tasks can be executed using `make` commands:

<!-- prettier-ignore -->
Command | Description
-|-
`make login` | Authenticate with Kubernetes and GitHub
`make dev` | Start a local development server
`make test` | Run tests
`make build` | Build a Docker image
`make deploy` | Deploy to Kubernetes
`make encrypt` | Encrypt sensitive files
`make decrypt` | Decrypt sensitive files

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
