import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: '${{ values.name }}',
  version: '0.1.0',
});

server.registerTool(
  'ping',
  {
    description:
      'Check that the server is alive. Returns a pong with the server name and current time.',
    inputSchema: {},
  },
  async () => ({
    content: [
      {
        type: 'text',
        text: `pong from ${{ values.name }} at ${new Date().toISOString()}`,
      },
    ],
  }),
);

server.registerTool(
  'echo',
  {
    description: 'Echo back the provided text. Useful as a starting point for new tools.',
    inputSchema: {
      text: z.string().describe('The text to echo back'),
    },
  },
  async ({ text }) => ({
    content: [{ type: 'text', text }],
  }),
);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(error => {
  console.error('server failed to start', error);
  process.exit(1);
});
