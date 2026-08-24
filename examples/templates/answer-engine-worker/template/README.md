# ${{ values.name }}

{% if values.description %}${{ values.description }}{% else %}Answer engine worker.{% endif %}

A worker that backs an answer engine: it consumes questions from a queue,
retrieves supporting context from a document index, and produces cited
answers. Designed to sit behind an AI Hub for the actual inference call.

## Quick start

```bash
npm install
npm run build
npm start
```

## Layout

| Path | Purpose |
|---|---|
| `src/index.ts` | Entry point — starts the API and the consumer loop |
| `src/consumer.ts` | Queue consumer — picks up question jobs |
| `src/indexer.ts` | Document indexer — builds the retrieval index |
| `src/api.ts` | Query API — synchronous question answering |
| `docs/` | TechDocs site source |
| `AGENTS.md` | Repo instructions for AI coding tools |

## The pipeline

```text
question → queue → consumer → retrieve (index) → answer (AI Hub) → cited answer
```
