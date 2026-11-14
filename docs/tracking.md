# Tracking

The portal includes a Plausible Analytics integration. Analytics is disabled in
`app-config.yaml` for local development and enabled in the production config.
The frontend adds the tracking script only when `plausible.enabled` is true and
both `plausible.dataDomain` and `plausible.sourceUrl` are set.

## Optional local analytics stack

Start with the [local demo setup](index.md#run-the-demo-locally). The analytics
stack additionally requires a running Docker daemon and Docker Compose, with
ports 80, 8080, 7007 and 8000 available. It starts Backstage and Traefik as well
as Plausible, PostgreSQL and ClickHouse. Stop `mise run dev` before starting
this stack to free the backend port.

In the gitignored `.env`, set `SECRET_KEY_BASE` and `TOTP_VAULT_KEY` for Plausible.
The starter file leaves them commented out. Use the secret-generation guidance
for the pinned Plausible Community Edition version in `compose.plausible.yaml`.
The starter Backstage analytics settings are already present in `.env`.

```dotenv
APP_BASE_URL=http://backstage.localhost
PLAUSIBLE_DATA_DOMAIN=backstage.localhost
PLAUSIBLE_SOURCE_URL=http://plausible.localhost/js/script.js
BASE_URL=http://plausible.localhost
```

Build the local Backstage image, then start the combined Compose stack from the
repository root.

```bash
mise run build
mise run plausible-up
```

Open [plausible.localhost](http://plausible.localhost) to finish Plausible setup
and add a site matching `PLAUSIBLE_DATA_DOMAIN`. Backstage runs at
[backstage.localhost](http://backstage.localhost). The production configuration
reads `PLAUSIBLE_DATA_DOMAIN` and `PLAUSIBLE_SOURCE_URL` from `.env`; the local
development configuration does not read those variables for analytics.

To connect `mise run dev` to a separately running Plausible instance, merge the
following top-level settings into `app-config.local.yaml`, replacing the script
URL with that instance's address. Restart the development stack after editing
the config. Use a site domain matching the address you browse.

```yaml
plausible:
  enabled: true
  dataDomain: localhost
  sourceUrl: https://plausible.example.com/js/script.js
```

The script tag confirms that the plugin is configured. It does not prove that
Plausible accepted an event; check browser network requests and the Plausible
dashboard when verifying collection.

Stop the combined analytics stack with the matching task.

```bash
mise run plausible-down
```

This stops the services without deleting their named database volumes.
