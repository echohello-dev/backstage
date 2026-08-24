# ${{ values.name }}

{% if values.description %}${{ values.description }}{% else %}Model Context Protocol server.{% endif %}

## What it does

Exposes domain tools to AI assistants over the
[Model Context Protocol](https://modelcontextprotocol.io), using stdio
transport.

## Tools

| Tool | Description |
|---|---|
| `ping` | Liveness check — returns server name and time |
| `echo` | Echoes back the provided text (example tool) |

## Adding a tool

Register tools in `src/index.ts`:

```ts
server.registerTool(
  'my_tool',
  { description: 'Written for the model: what, when, returns', inputSchema: {} },
  async args => ({ content: [{ type: 'text', text: 'result' }] }),
);
```

Guidelines:

- Tool names are `snake_case`, scoped to this server's domain.
- Descriptions are written for the model, not humans.
- Prefer stateless tools; pass everything needed as input.

## Configuration

No configuration required for the skeleton. Add environment variables here
as tools need them — never commit secrets.
