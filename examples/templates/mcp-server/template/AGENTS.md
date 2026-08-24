# Agent instructions for ${{ values.name }}

## What this repo is

A Model Context Protocol (MCP) server exposing domain tools to AI
assistants over stdio.

## Commands

- Build: `npm run build`
- Run locally: `npm start` (after build) — speaks MCP over stdio
- Type-check without emitting: `npx tsc --noEmit`

## Conventions

- Every tool is registered in `src/index.ts` with `server.registerTool`.
- Tool names are `snake_case` and scoped to this server's domain.
- Tool descriptions are written for the model, not for humans: say what
  the tool does, when to use it, and what it returns.
- Keep tools stateless where possible; take everything they need as input.
- No secrets in the repo; configuration comes from environment variables.

## When editing

- Update `docs/` when tools are added, removed, or change shape.
- Keep this file short — move detail into `docs/` and link to it.
