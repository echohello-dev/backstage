# Agent instructions for ${{ values.name }}

## What this repo is

An answer-engine worker: queue consumer + document indexer + query API.
It retrieves context from an index and delegates inference to an AI Hub —
it never calls an LLM provider directly.

## Commands

- Build: `npm run build`
- Run locally: `npm start` (after build), listens on `PORT` (default 8080)
- Type-check without emitting: `npx tsc --noEmit`

## Conventions

- Inference goes through the AI Hub endpoint (`AI_HUB_URL`), never through
  provider SDKs in this repo.
- Retrieval logic stays in `src/indexer.ts`; queue mechanics stay in
  `src/consumer.ts`; HTTP surface stays in `src/api.ts`.
- Answers must carry citations — an answer without sources is a bug.
- No secrets in the repo; configuration comes from environment variables.

## When editing

- Update `docs/` when the pipeline, endpoints, or configuration change.
- Keep this file short — move detail into `docs/` and link to it.
