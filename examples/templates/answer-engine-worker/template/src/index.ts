import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { answer } from './api.js';
import { consume, Queue } from './consumer.js';
import { indexDocument } from './indexer.js';

const port = Number(process.env.PORT ?? 8080);

async function readBody(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(chunk as Buffer);
  }
  return Buffer.concat(chunks).toString('utf8');
}

function sendJson(res: ServerResponse, status: number, body: unknown): void {
  res.writeHead(status, { 'content-type': 'application/json' });
  res.end(JSON.stringify(body));
}

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/healthz') {
    sendJson(res, 200, { status: 'ok' });
    return;
  }
  if (req.method === 'POST' && req.url === '/v1/ask') {
    readBody(req)
      .then(raw => {
        const body = JSON.parse(raw) as { question?: string };
        if (!body.question) {
          sendJson(res, 400, { error: 'question is required' });
          return undefined;
        }
        return answer({ id: crypto.randomUUID(), text: body.question }).then(
          result => sendJson(res, 200, result),
        );
      })
      .catch(err => sendJson(res, 500, { error: String(err) }));
    return;
  }
  if (req.method === 'POST' && req.url === '/v1/index') {
    readBody(req)
      .then(raw => {
        const doc = JSON.parse(raw) as Parameters<typeof indexDocument>[0];
        indexDocument(doc);
        sendJson(res, 202, { indexed: doc.id });
      })
      .catch(err => sendJson(res, 400, { error: String(err) }));
    return;
  }
  sendJson(res, 404, { error: 'not found' });
});

server.listen(port, () => {
  console.log(`answer-engine listening on :${port}`);
});

const disabledQueue: Queue = {
  receive: () => Promise.resolve(undefined),
  ack: () => Promise.resolve(),
  nack: (_question, error) => {
    console.error('question failed', error);
    return Promise.resolve();
  },
};

consume(disabledQueue).catch(err => {
  console.error('consumer loop exited', err);
  process.exit(1);
});
