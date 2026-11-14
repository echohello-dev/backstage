import { fireEvent, screen, within } from '@testing-library/react';
import { renderInTestApp } from '@backstage/test-utils';
import { ExplorePage } from './ExplorePage';
import { defaultTools } from './toolsConfig';

describe('ExplorePage', () => {
  it('labels search and exposes category selection and the tool count', async () => {
    await renderInTestApp(<ExplorePage />);

    expect(
      screen.getByRole('textbox', { name: 'Search tools' }),
    ).toBeInTheDocument();
    const categories = within(
      screen.getByRole('group', { name: 'Tool categories' }),
    );
    expect(
      categories.getByRole('button', { name: /^All \(/, pressed: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      `${defaultTools.length} tools available`,
    );

    fireEvent.click(
      categories.getByRole('button', { name: /^Development \(/ }),
    );

    expect(
      categories.getByRole('button', {
        name: /^Development \(/,
        pressed: true,
      }),
    ).toBeInTheDocument();
    expect(
      categories.getByRole('button', { name: /^All \(/, pressed: false }),
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('4 tools available');
    expect(screen.getAllByRole('link', { name: 'Visit' })).toHaveLength(4);
    expect(screen.queryByText('AWS Console')).not.toBeInTheDocument();
  });

  it('combines search and category filters and restores all tools with focus', async () => {
    await renderInTestApp(<ExplorePage />);
    const search = screen.getByRole('textbox', { name: 'Search tools' });

    fireEvent.change(search, { target: { value: 'github' } });
    expect(screen.getByRole('status')).toHaveTextContent('2 tools available');

    fireEvent.click(screen.getByRole('button', { name: /^Security \(/ }));

    expect(screen.getByRole('status')).toHaveTextContent('0 tools available');
    expect(screen.getAllByText(/No tools found/)).toHaveLength(1);
    expect(screen.getByText(/No tools found/)).toHaveTextContent(
      'No tools found matching "github" in Security',
    );
    expect(
      screen.queryByRole('link', { name: /Visit|Open/ }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(search).toHaveValue('');
    expect(search).toHaveFocus();
    expect(
      screen.getByRole('button', { name: /^All \(/, pressed: true }),
    ).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(
      `${defaultTools.length} tools available`,
    );
    expect(screen.getAllByRole('link', { name: /Visit|Open/ })).toHaveLength(
      defaultTools.length,
    );
    expect(screen.queryByText(/No tools found/)).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Clear filters' }),
    ).not.toBeInTheDocument();
  });

  it('offers a single recoverable empty state across all categories', async () => {
    await renderInTestApp(<ExplorePage />);
    const search = screen.getByRole('textbox', { name: 'Search tools' });

    fireEvent.change(search, { target: { value: 'no-such-tool' } });

    expect(screen.getAllByText(/No tools found/)).toHaveLength(1);
    expect(screen.getByText(/No tools found/)).toHaveTextContent(
      'No tools found matching "no-such-tool"',
    );
    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(search).toHaveFocus();
    expect(screen.getAllByRole('link', { name: /Visit|Open/ })).toHaveLength(
      defaultTools.length,
    );
  });

  it.each([
    ['GITHUB', 'GitHub', 2],
    ['browser-based', 'VS Code Web', 1],
    ['scm', 'GitLab', 2],
  ])(
    'matches names, descriptions and tags for %s',
    async (term, name, count) => {
      await renderInTestApp(<ExplorePage />);

      fireEvent.change(screen.getByRole('textbox', { name: 'Search tools' }), {
        target: { value: term },
      });

      expect(screen.getByText(name)).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent(
        `${count} tool${count === 1 ? '' : 's'} available`,
      );
      expect(screen.getAllByRole('link', { name: 'Visit' })).toHaveLength(
        count,
      );
    },
  );
});
