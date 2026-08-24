# ${{ values.name }}

{% if values.description %}${{ values.description }}{% else %}AI Hub gateway service.{% endif %}

A thin, provider-agnostic gateway in front of one or more LLM providers.
Route inference traffic through this service so authentication, rate
limiting, cost tracking, and audit logging live in exactly one place.

## Quick start

```bash
npm install
npm run build
npm start
```

The server listens on `PORT` (default `8080`):

- `GET /healthz` — liveness probe
- `POST /v1/answer` — single entry point for inference requests (stubbed
  until a provider is wired in `src/providers/`)

## Layout

| Path | Purpose |
|---|---|
| `src/index.ts` | HTTP server and route wiring |
| `src/providers/` | One file per LLM provider (add yours here) |
| `docs/` | TechDocs site source |
| `AGENTS.md` | Repo instructions for AI coding tools |

## Documentation

Rendered docs are published via TechDocs — see the **Docs** tab on this
component's page in the Developer Portal.
