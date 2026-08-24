# ${{ values.name }}

{% if values.description %}${{ values.description }}{% else %}Model Context Protocol server.{% endif %}

A [Model Context Protocol](https://modelcontextprotocol.io) server that AI
assistants connect to for domain-specific tools and context.

## Quick start

```bash
npm install
npm run build
npm start
```

The server speaks MCP over stdio. Register it with your assistant of
choice (Claude Desktop, Claude Code, Cursor, ...) by pointing it at
`node dist/index.js`.

## Layout

| Path | Purpose |
|---|---|
| `src/index.ts` | Server definition and tool registrations |
| `docs/` | TechDocs site source |
| `AGENTS.md` | Repo instructions for AI coding tools |

## Adding a tool

```ts
server.registerTool(
  'my_tool',
  { description: 'What it does', inputSchema: { /* zod schema */ } },
  async args => ({ content: [{ type: 'text', text: 'result' }] }),
);
```
