import { createServer, IncomingMessage, ServerResponse } from 'node:http';

const port = Number(process.env.PORT ?? 8080);

interface AnswerRequest {
  prompt: string;
  model?: string;
}

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

async function handleAnswer(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const raw = await readBody(req);
  let payload: AnswerRequest;
  try {
    payload = JSON.parse(raw) as AnswerRequest;
  } catch {
    sendJson(res, 400, { error: 'request body must be JSON' });
    return;
  }
  if (!payload.prompt) {
    sendJson(res, 400, { error: 'prompt is required' });
    return;
  }
  sendJson(res, 501, {
    error: 'no provider configured',
    hint: 'add a provider in src/providers/ and route to it here',
  });
}

const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/healthz') {
    sendJson(res, 200, { status: 'ok' });
    return;
  }
  if (req.method === 'POST' && req.url === '/v1/answer') {
    handleAnswer(req, res).catch(err => {
      sendJson(res, 500, { error: String(err) });
    });
    return;
  }
  sendJson(res, 404, { error: 'not found' });
});

server.listen(port, () => {
  console.log(`ai-hub listening on :${port}`);
});
