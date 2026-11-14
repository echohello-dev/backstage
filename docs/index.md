# Backstage

## Run the demo locally

Install [mise](https://mise.jdx.dev/), trust the repository configuration after
reviewing `mise.toml`, and use the tool versions declared there. Run the tasks
from the repository root.

1. Clone the repository and enter it.

   ```bash
   git clone https://github.com/echohello-dev/backstage.git
   cd backstage
   ```

2. Install dependencies and prepare the local configuration.

   ```bash
   mise run install
   ```

   This copies `.env.example` to `.env` and `app-config.example.yaml` to
   `app-config.local.yaml` when those files are missing. Existing local files
   are preserved. Keep local credentials in these gitignored files.

3. Start the frontend and backend.

   ```bash
   mise run dev
   ```

4. Open [localhost:3000](http://localhost:3000), choose Guest, then Enter.
   The backend runs on [localhost:7007](http://localhost:7007). Stop the
   development stack with Ctrl+C in its terminal.

Guest access is read-only. You can browse the showcase, catalog, TechDocs and
software templates, but running a template requires developer permissions.
See the [demo baseline](demo-baseline.md) for the access rules and known limits.
The local catalog uses an in-memory database that resets when the backend restarts.
The default development stack does not require Docker; the optional Compose
stack below does.

## Development tasks

All tasks run through mise. See the [development guide](development.md) for
verification details and TechDocs troubleshooting.

| Command            | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `mise run install` | Install dependencies and prepare local configuration     |
| `mise run dev`     | Start the frontend on port 3000 and backend on port 7007 |
| `mise run lint`    | Run TypeScript checks and ESLint across the workspaces   |
| `mise run test`    | Run the test suite without watch mode                    |
| `mise run build`   | Build the Docker image locally, without publishing it    |
| `mise run up`      | Start Backstage with Traefik using Docker Compose        |
| `mise run down`    | Stop the Backstage and Traefik Compose stack             |

The Compose stack serves Backstage at [backstage.localhost](http://backstage.localhost)
and uses the production configuration and `.env` values. Review those values before
starting it. See the [tracking guide](tracking.md) for the optional Plausible stack.

## Backstage references

- [Keeping Backstage Updated](https://backstage.io/docs/getting-started/keeping-backstage-updated/)
- [Configuration](https://backstage.io/docs/conf/)
- [Loading Configuration](https://backstage.io/docs/conf/reading)
- [New Backend System](https://backstage.io/docs/backend-system/)
- [Migrating to New Auth Services](https://backstage.io/docs/tutorials/auth-service-migration/)
- [Custom App Theme](https://backstage.io/docs/getting-started/app-custom-theme/)
