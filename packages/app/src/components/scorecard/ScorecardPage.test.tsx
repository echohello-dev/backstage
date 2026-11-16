import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { ScorecardPage } from './ScorecardPage';

describe('ScorecardPage', () => {
  const getEntities = jest.fn();
  const demoService = {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'Component',
    metadata: { name: 'demo-service', description: 'A demo service' },
    spec: { type: 'service', lifecycle: 'experimental', owner: 'guest' },
  };
  const demoApi = {
    ...demoService,
    kind: 'API',
    metadata: { name: 'demo-api', description: 'Public endpoint' },
    spec: { ...demoService.spec, type: 'openapi' },
  };

  const renderPage = () =>
    renderInTestApp(
      <TestApiProvider apis={[[catalogApiRef, { getEntities }]]}>
        <ScorecardPage />
      </TestApiProvider>,
    );

  beforeEach(() => {
    getEntities.mockReset();
  });

  it('shows a catalog link instead of invalid metrics when the catalog is empty', async () => {
    getEntities.mockResolvedValue({ items: [] });

    await renderPage();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'No catalog entities to score',
    );
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Scorecards use components, APIs and systems from the catalog.',
    );
    expect(
      screen.getByRole('link', { name: 'Browse the catalog' }),
    ).toHaveAttribute('href', '/catalog');
    expect(screen.queryByText('Average Score')).not.toBeInTheDocument();
    expect(screen.queryByText('Category Averages')).not.toBeInTheDocument();
    expect(screen.queryByText(/NaN/)).not.toBeInTheDocument();
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument();
    expect(
      screen.queryByText('No entities found matching your filters.'),
    ).not.toBeInTheDocument();
  });

  it('renders metrics and scorecards when catalog entities are available', async () => {
    getEntities.mockResolvedValue({ items: [demoService] });

    await renderPage();

    expect(screen.getByText('demo-service')).toBeInTheDocument();
    expect(screen.getByText('Average Score')).toBeInTheDocument();
    expect(screen.getByText('Across 1 entities')).toBeInTheDocument();
    expect(screen.getByText('Category Averages')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(
      screen.queryByText('No catalog entities to score'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/NaN/)).not.toBeInTheDocument();
  });

  it('keeps catalog metrics when search filters have no matches', async () => {
    getEntities.mockResolvedValue({ items: [demoService] });

    await renderPage();
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'no-matching-service' },
    });

    expect(
      screen.getByText('No entities found matching your filters.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Average Score')).toBeInTheDocument();
    expect(screen.queryByText('demo-service')).not.toBeInTheDocument();
    expect(
      screen.queryByText('No catalog entities to score'),
    ).not.toBeInTheDocument();
  });

  it('labels every filter and announces the matching entity count', async () => {
    getEntities.mockResolvedValue({ items: [demoService, demoApi] });

    await renderPage();

    expect(
      screen.getByRole('textbox', { name: 'Search entities' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Kind' })).toHaveTextContent(
      'All',
    );
    expect(screen.getByRole('combobox', { name: 'Type' })).toHaveTextContent(
      'All',
    );
    expect(screen.getByRole('status')).toHaveTextContent('2 entities found');
    expect(
      screen.queryByRole('button', { name: 'Clear filters' }),
    ).not.toBeInTheDocument();
  });

  it('combines all filters and clears them with focus even when no entities match', async () => {
    getEntities.mockResolvedValue({ items: [demoService, demoApi] });

    await renderPage();
    const search = screen.getByRole('textbox', { name: 'Search entities' });

    fireEvent.change(search, { target: { value: 'demo' } });
    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Kind' }));
    fireEvent.click(screen.getByRole('option', { name: 'Component' }));

    expect(screen.getByRole('status')).toHaveTextContent('1 entity found');
    expect(screen.getByText('demo-service')).toBeInTheDocument();
    expect(screen.queryByText('demo-api')).not.toBeInTheDocument();

    fireEvent.mouseDown(screen.getByRole('combobox', { name: 'Type' }));
    fireEvent.click(screen.getByRole('option', { name: 'openapi' }));

    expect(screen.getByRole('status')).toHaveTextContent('0 entities found');
    expect(
      screen.getByText('No entities found matching your filters.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Across 2 entities')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Clear filters' }));

    expect(search).toHaveValue('');
    expect(search).toHaveFocus();
    expect(screen.getByRole('combobox', { name: 'Kind' })).toHaveTextContent(
      'All',
    );
    expect(screen.getByRole('combobox', { name: 'Type' })).toHaveTextContent(
      'All',
    );
    expect(screen.getByRole('status')).toHaveTextContent('2 entities found');
    expect(screen.getByText('demo-service')).toBeInTheDocument();
    expect(screen.getByText('demo-api')).toBeInTheDocument();
    expect(
      screen.queryByText('No entities found matching your filters.'),
    ).not.toBeInTheDocument();
  });

  it.each(['  PUBLIC  ', '   '])(
    'normalises search whitespace and case for %j',
    async term => {
      getEntities.mockResolvedValue({ items: [demoService, demoApi] });

      await renderPage();
      fireEvent.change(
        screen.getByRole('textbox', { name: 'Search entities' }),
        {
          target: { value: term },
        },
      );

      expect(screen.getByText('demo-api')).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveTextContent(
        term.trim() ? '1 entity found' : '2 entities found',
      );
    },
  );

  it('waits for the catalog before showing an empty state', async () => {
    getEntities.mockReturnValue(new Promise(() => {}));

    await renderPage();

    expect(
      screen.getByRole('progressbar', { name: 'Loading scorecards' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText('No catalog entities to score'),
    ).not.toBeInTheDocument();
  });

  it('reports catalog failures instead of showing an empty state', async () => {
    getEntities.mockRejectedValue(new Error('Catalog unavailable'));

    await renderPage();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Could not load scorecards',
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Catalog unavailable');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(
      screen.queryByText('No catalog entities to score'),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Average Score')).not.toBeInTheDocument();
  });

  it('retries a failed catalog load and shows scorecards after a pending request', async () => {
    let resolveRetry: () => void;
    const retry = new Promise<{ items: (typeof demoService)[] }>(resolve => {
      resolveRetry = () => resolve({ items: [demoService] });
    });
    getEntities
      .mockRejectedValueOnce(new Error('Catalog unavailable'))
      .mockReturnValueOnce(retry);

    await renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(
      screen.getByRole('progressbar', { name: 'Loading scorecards' }),
    ).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Retry' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Average Score')).not.toBeInTheDocument();
    expect(getEntities).toHaveBeenCalledTimes(2);
    expect(getEntities).toHaveBeenLastCalledWith({
      filter: [{ kind: 'component' }, { kind: 'api' }, { kind: 'system' }],
    });

    await act(async () => resolveRetry());

    expect(screen.getByText('demo-service')).toBeInTheDocument();
    expect(screen.getByText('Average Score')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('1 entity found');
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('progressbar', { name: 'Loading scorecards' }),
    ).not.toBeInTheDocument();
    expect(getEntities).toHaveBeenCalledTimes(2);
  });

  it('offers another retry after a second failure and handles an empty recovery', async () => {
    getEntities
      .mockRejectedValueOnce(new Error('Catalog unavailable'))
      .mockRejectedValueOnce(new Error('Still unavailable'))
      .mockResolvedValueOnce({ items: [] });

    await renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent('Still unavailable'),
    );
    expect(screen.queryByText('Catalog unavailable')).not.toBeInTheDocument();
    expect(screen.queryByText('Average Score')).not.toBeInTheDocument();
    expect(
      screen.queryByText('No catalog entities to score'),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    await waitFor(() =>
      expect(screen.getByRole('alert')).toHaveTextContent(
        'No catalog entities to score',
      ),
    );
    expect(screen.queryByText('Still unavailable')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Retry' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Average Score')).not.toBeInTheDocument();
    expect(getEntities).toHaveBeenCalledTimes(3);
  });

  it('offers retry when the catalog rejects without an Error object', async () => {
    getEntities.mockRejectedValue(null);

    await renderPage();

    expect(screen.getByRole('alert')).toHaveTextContent(
      'The catalog is unavailable.',
    );
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
  });
});
