import { screen } from '@testing-library/react';
import { renderInTestApp } from '@backstage/test-utils';
import { ShowcaseCard } from './ShowcaseCard';
import { ShowcaseItem, templateShowcaseLink } from './showcaseConfig';

const baseItem: ShowcaseItem = {
  id: 'template-mcp-server',
  name: 'MCP Server',
  description:
    'Scaffold a Model Context Protocol server that AI assistants connect to for domain-specific tools and context.',
  category: 'templates',
  link: templateShowcaseLink('mcp-server'),
  linkLabel: 'Use template',
  tags: ['recommended', 'ai', 'mcp', 'github'],
  isRecommended: true,
};

describe('ShowcaseCard', () => {
  it('renders name, description, category label and tags', async () => {
    await renderInTestApp(<ShowcaseCard item={baseItem} />);

    expect(screen.getByText('MCP Server')).toBeInTheDocument();
    expect(screen.getByText(/Model Context Protocol server/)).toBeInTheDocument();
    expect(screen.getByText('Code Templates')).toBeInTheDocument();
    expect(screen.getByText('ai')).toBeInTheDocument();
    expect(screen.getByText('mcp')).toBeInTheDocument();
  });

  it('shows the recommended badge only for recommended items', async () => {
    const { rerender } = await renderInTestApp(<ShowcaseCard item={baseItem} />);
    expect(screen.getByText('Recommended')).toBeInTheDocument();

    rerender(<ShowcaseCard item={{ ...baseItem, isRecommended: false }} />);
    expect(screen.queryByText('Recommended')).not.toBeInTheDocument();
  });

  it('truncates tags to four', async () => {
    const item: ShowcaseItem = {
      ...baseItem,
      id: 'many-tags',
      tags: ['one', 'two', 'three', 'four', 'five', 'six'],
    };
    await renderInTestApp(<ShowcaseCard item={item} />);

    expect(screen.getByText('four')).toBeInTheDocument();
    expect(screen.queryByText('five')).not.toBeInTheDocument();
    expect(screen.queryByText('six')).not.toBeInTheDocument();
  });

  it('links the action button to the item link with its label', async () => {
    await renderInTestApp(<ShowcaseCard item={baseItem} />);

    const link = screen.getByRole('link', { name: 'Use template' });
    expect(link).toHaveAttribute(
      'href',
      '/self-service/templates/default/mcp-server',
    );
  });
});
