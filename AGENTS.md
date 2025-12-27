# AI Agent Instructions for Backstage Showcase

## Project Overview

This is a **Backstage developer portal** — a monorepo with a React frontend (`packages/app`) and Node.js backend (`packages/backend`), plus custom plugins in `plugins/`. It uses the new Backstage backend system with `createBackend()`.

## Development Commands

All commands go through **mise** (not yarn directly):

```bash
mise run install    # Install dependencies (runs yarn install)
mise run dev        # Start frontend (localhost:3000) + backend (localhost:7007)
mise run lint       # Lint and type-check
mise run test       # Run tests
mise run build      # Build Docker image
mise run up         # Start with Traefik (production-like)
```

## Architecture

### Monorepo Structure

- **`packages/app`** — React frontend using MUI v5 + `@backstage/core-components`
- **`packages/backend`** — Node.js backend using `@backstage/backend-defaults`
- **`plugins/`** — Custom plugins (scoped as `@internal/`):
  - `plausible/` — Analytics integration (frontend-plugin)
  - `permission-backend-module-default/` — RBAC policy (backend-plugin-module)

### Backend Plugin Registration

Backend uses the new system. Add plugins in [packages/backend/src/index.ts](packages/backend/src/index.ts):

```typescript
const backend = createBackend();
backend.add(import('@backstage/plugin-catalog-backend'));
backend.add(
  import('@internal/backstage-plugin-permission-backend-module-default'),
);
backend.start();
```

### Frontend App Structure

- Entry: [packages/app/src/App.tsx](packages/app/src/App.tsx)
- Routes use `FlatRoutes` with `<Route>` components
- Entity pages: [packages/app/src/components/catalog/EntityPage.tsx](packages/app/src/components/catalog/EntityPage.tsx)
- Sidebar navigation: [packages/app/src/components/Root/Root.tsx](packages/app/src/components/Root/Root.tsx)

## Theming Pattern

Custom themes use `createUnifiedTheme()` from `@backstage/theme`:

- Default theme: [packages/app/src/theme/index.ts](packages/app/src/theme/index.ts)
- Brand themes: [packages/app/src/themes/brandTheme.ts](packages/app/src/themes/brandTheme.ts)

Themes are registered in App.tsx via the `themes` array with `UnifiedThemeProvider`.

## Configuration Files

- `app-config.yaml` — Base config (local development)
- `app-config.local.yaml` — Local overrides (gitignored)
- `app-config.production.yaml` — Production config (uses env vars like `${APP_BASE_URL}`)

Environment variables are loaded from `.env` via mise.

## Permission System

RBAC is implemented in [plugins/permission-backend-module-default/src/module.ts](plugins/permission-backend-module-default/src/module.ts):

- Groups: `readers` (read-only), `developers` (CRUD), `admins`
- Uses `policyExtensionPoint` to register custom `PermissionPolicy`

## Software Templates

Templates live in `examples/templates/`. Each template has:

- `template.yaml` — Scaffolder definition with parameters and steps
- `template/` — Skeleton files to copy

Example: [examples/templates/github-blank-repo/template.yaml](examples/templates/github-blank-repo/template.yaml)

## Entity Catalog

- Sample entities: `examples/` directory (components, APIs, domains, systems)
- Entity types customized per kind in [EntityPage.tsx](packages/app/src/components/catalog/EntityPage.tsx)
- Uses `EntitySwitch.Case` with predicates like `isKind('component')`

## Docker & Deployment

- Multi-stage Dockerfile uses asdf for Node.js/Python
- Production runs: `node . --config ../../app-config.yaml --config ../../app-config.production.yaml`
- Traefik reverse proxy via `compose.yaml`

## Key Conventions

1. **Plugin naming**: `@internal/backstage-plugin-{name}` for private plugins
2. **Internal links**: Use `link:../app` in package.json for local dependencies
3. **MUI imports**: Use `@mui/material` (v5), not `@material-ui/core` (v4)
4. **Icons**: Import from `@mui/icons-material` as `IconComponent` for Sidebar
5. **Yarn workspaces**: `packages/*` and `plugins/*`
