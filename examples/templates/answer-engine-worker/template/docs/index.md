# ${{ values.name }}

{% if values.description %}${{ values.description }}{% else %}Answer engine worker.{% endif %}

## What it does

Consumes questions from a queue, retrieves supporting context from a
document index, and produces cited answers. Inference is delegated to an
AI Hub — this worker owns retrieval, orchestration, and citation.

## Endpoints

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/healthz` | Liveness probe |
| `POST` | `/v1/ask` | Ask a question synchronously |
| `POST` | `/v1/index` | Add a document to the retrieval index |

## Configuration

| Variable | Default | Purpose |
|---|---|---|
| `PORT` | `8080` | Listen port |
| `AI_HUB_URL` | _(unset)_ | Base URL of the AI Hub used for inference |
| `QUEUE_POLL_INTERVAL_MS` | `5000` | Queue poll interval |

## Replacing the stubs

- **Queue** — implement the `Queue` interface in `src/consumer.ts` against
  your broker (SQS, Pub/Sub, Kafka).
- **Index** — swap the in-memory index in `src/indexer.ts` for your vector
  store or search backend.
- **Answers** — answers must always carry citations; treat an uncited
  answer as a bug.
