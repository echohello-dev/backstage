# ${{ values.name }}

{% if values.description %}${{ values.description }}{% else %}AI Hub gateway service.{% endif %}

## What it does

This service is the single entry point for LLM inference traffic. Consumers
call `POST /v1/answer`; the hub handles authentication, rate limiting, cost
tracking, and routing to the configured provider.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/healthz` | Liveness probe |
| `POST` | `/v1/answer` | Submit a prompt, receive an answer |

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` | Listen port |

Provider credentials are read from environment variables. Never commit
secrets to this repository.

## Adding a provider

1. Create `src/providers/<name>.ts` implementing the `Provider` interface
   from `src/providers/index.ts`.
2. Instantiate it in `src/index.ts` and route `/v1/answer` to it.
3. Document the provider and its configuration here.
