import { screen, fireEvent, within } from '@testing-library/react';
import { renderInTestApp } from '@backstage/test-utils';
import { ShowcasePage } from './ShowcasePage';
import { showcaseItems, countByCategory } from './showcaseConfig';

describe('ShowcasePage', () => {
  it('distinguishes live keyword search from the answer-engine extension', async () => {
    await renderInTestApp(<ShowcasePage />);

    fireEvent.click(screen.getByText(/^Answer Engine \(/));

    expect(screen.getByRole('alert')).toHaveTextContent(
      'The demo does not generate answers.',
    );
    const search = within(
      screen.getByTestId('showcase-card-answer-engine-search'),
    );
    expect(search.getByText('Built-in search')).toBeInTheDocument();
    expect(search.getByText('Catalog and Docs Search')).toBeInTheDocument();
    expect(
      search.getByRole('link', { name: 'Search catalog and docs' }),
    ).toHaveAttribute('href', '/search');

    const extension = within(
      screen.getByTestId('showcase-card-answer-engine-worker-card'),
    );
    expect(extension.getByText('Extension template')).toBeInTheDocument();
    expect(
      extension.getByText(/your own document index and AI Hub/),
    ).toBeInTheDocument();
    expect(extension.getByRole('link', { name: 'Use template' })).toHaveAttribute(
      'href',
      '/self-service/templates/default/answer-engine-worker',
    );
    expect(screen.queryByText('Answer Engine Search')).not.toBeInTheDocument();
    expect(screen.getByText('2 items available')).toBeInTheDocument();
  });

  it('renders every item with the total count and category chips', async () => {
    await renderInTestApp(<ShowcasePage />);
    const counts = countByCategory(showcaseItems);

    expect(screen.getByText('Plugin Showcase')).toBeInTheDocument();
    expect(
      screen.getByText(`${counts.all} items available`),
    ).toBeInTheDocument();
    expect(screen.getByText(`All (${counts.all})`)).toBeInTheDocument();
    expect(
      screen.getByText(`Code Templates (${counts.templates})`),
    ).toBeInTheDocument();
    expect(screen.getByText(`GitHub (${counts.github})`)).toBeInTheDocument();
    showcaseItems.forEach(item => {
      expect(
        document.querySelector(`[data-testid="showcase-card-${item.id}"]`),
      ).not.toBeNull();
    });
  });

  it('filters cards when a category chip is clicked', async () => {
    await renderInTestApp(<ShowcasePage />);

    fireEvent.click(screen.getByText(/^GitHub \(/));

    const githubItems = showcaseItems.filter(i => i.category === 'github');
    expect(
      screen.getByText(`${githubItems.length} items available`),
    ).toBeInTheDocument();
    githubItems.forEach(item => {
      expect(
        document.querySelector(`[data-testid="showcase-card-${item.id}"]`),
      ).not.toBeNull();
    });
    expect(
      document.querySelector('[data-testid="showcase-card-template-mcp-server"]'),
    ).toBeNull();
  });

  it('filters cards by search term', async () => {
    await renderInTestApp(<ShowcasePage />);

    fireEvent.change(screen.getByPlaceholderText('Search showcase...'), {
      target: { value: 'mcp' },
    });

    expect(
      document.querySelector('[data-testid="showcase-card-template-mcp-server"]'),
    ).not.toBeNull();
    expect(
      document.querySelector(
        '[data-testid="showcase-card-template-github-blank-repo"]',
      ),
    ).toBeNull();
  });

  it('shows the empty state when nothing matches', async () => {
    await renderInTestApp(<ShowcasePage />);

    fireEvent.change(screen.getByPlaceholderText('Search showcase...'), {
      target: { value: 'zzzz-nothing' },
    });

    expect(screen.getByText(/No showcase items found/)).toBeInTheDocument();
    expect(screen.getByText('0 items available')).toBeInTheDocument();
  });
});
