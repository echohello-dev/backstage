# Agent instructions for ${{ values.name }}

## What this repo is

An AI Hub gateway: a single, provider-agnostic front door for LLM inference
traffic. Provider SDKs are never called directly by consumers — everything
goes through this service.

## Commands

- Build: `npm run build`
- Run locally: `npm start` (after build), listens on `PORT` (default 8080)
- Type-check without emitting: `npx tsc --noEmit`

## Conventions

- One file per provider in `src/providers/`, each exporting a
  `complete(request): Promise<Answer>`-shaped function.
- No provider SDK imports outside `src/providers/`.
- No secrets in the repo. Provider credentials come from environment
  variables only.
- Keep request/response shapes stable; consumers depend on them.

## When editing

- Update `docs/` when behaviour, endpoints, or configuration change.
- Keep this file short — move detail into `docs/` and link to it.
