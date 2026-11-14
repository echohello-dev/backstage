import { screen, fireEvent, within } from '@testing-library/react';
import { renderInTestApp } from '@backstage/test-utils';
import { ShowcasePage } from './ShowcasePage';
import { showcaseItems, countByCategory } from './showcaseConfig';

describe('ShowcasePage', () => {
  it('explains guest preview access before linking to templates', async () => {
    await renderInTestApp(<ShowcasePage />);

    expect(screen.getByText(/Guest access is read-only/)).toHaveTextContent(
      'You can preview template forms and steps. Running a template to create a repository or pull request requires developer permissions.',
    );
    const templateLinks = screen.getAllByRole('link', {
      name: 'Preview template',
    });
    expect(templateLinks).toHaveLength(8);
    templateLinks.forEach(link => {
      expect(link).toHaveAttribute(
        'href',
        expect.stringMatching(/^\/self-service\/templates\/default\//),
      );
    });
    expect(
      screen.getByRole('link', { name: 'Browse templates' }),
    ).toHaveAttribute('href', '/self-service');
    expect(
      screen.queryByRole('link', { name: /Use template|Create component/ }),
    ).not.toBeInTheDocument();
  });

  it('labels search and exposes the active category and result count', async () => {
    await renderInTestApp(<ShowcasePage />);

    expect(
      screen.getByRole('textbox', { name: 'Search showcase' }),
    ).toBeInTheDocument();
    const categories = within(
      screen.getByRole('group', { name: 'Showcase categories' }),
    );
    expect(
      categories.getByRole('button', { name: /^All \(/, pressed: true }),
    ).toBeInTheDocument();

    fireEvent.click(categories.getByRole('button', { name: /^GitHub \(/ }));

    expect(
      categories.getByRole('button', { name: /^GitHub \(/, pressed: true }),
    ).toBeInTheDocument();
    expect(
      categories.getByRole('button', { name: /^All \(/, pressed: false }),
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('3 items available');
  });

  it('combines search and category filters and restores all cards from an empty result', async () => {
    await renderInTestApp(<ShowcasePage />);
    const search = screen.getByRole('textbox', { name: 'Search showcase' });

    fireEvent.change(search, { target: { value: 'mcp' } });
    expect(screen.getByRole('status')).toHaveTextContent('1 item available');
    expect(
      screen.getByTestId('showcase-card-template-mcp-server'),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /^GitHub \(/ }));

    expect(screen.getByRole('status')).toHaveTextContent('0 items available');
    expect(screen.getByText(/No showcase items found/)).toHaveTextContent(
      'in GitHub',
    );
    expect(screen.queryAllByTestId(/^showcase-card-/)).toHaveLength(0);

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(search).toHaveValue('');
    expect(search).toHaveFocus();
    expect(
      screen.getByRole('button', { name: /^All \(/, pressed: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      `${showcaseItems.length} items available`,
    );
    expect(screen.getAllByTestId(/^showcase-card-/)).toHaveLength(
      showcaseItems.length,
    );
    expect(
      screen.queryByRole('button', { name: 'Clear filters' }),
    ).not.toBeInTheDocument();
  });

  it('distinguishes live keyword search from the answer-engine extension', async () => {
    await renderInTestApp(<ShowcasePage />);

    fireEvent.click(screen.getByText(/^Answer Engine \(/));

    expect(
      screen.getByText(/The demo does not generate answers/),
    ).toHaveTextContent('The demo does not generate answers.');
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
    expect(
      extension.getByRole('link', { name: 'Preview template' }),
    ).toHaveAttribute(
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
      document.querySelector(
        '[data-testid="showcase-card-template-mcp-server"]',
      ),
    ).toBeNull();
  });

  it('filters cards by search term', async () => {
    await renderInTestApp(<ShowcasePage />);

    fireEvent.change(screen.getByPlaceholderText('Search showcase...'), {
      target: { value: 'mcp' },
    });

    expect(
      document.querySelector(
        '[data-testid="showcase-card-template-mcp-server"]',
      ),
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
