import { fireEvent, screen, within } from '@testing-library/react';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { Entity } from '@backstage/catalog-model';
import { useLocation } from 'react-router-dom';
import { HomePage } from './HomePage';

const component = (name: string, lifecycle?: string): Entity => ({
  apiVersion: 'backstage.io/v1alpha1',
  kind: 'Component',
  metadata: { name },
  spec: { type: 'service', owner: 'guest', ...(lifecycle && { lifecycle }) },
});

const LocationDisplay = () => {
  const location = useLocation();
  return (
    <div data-testid="location">{location.pathname + location.search}</div>
  );
};

describe('HomePage component lifecycles', () => {
  const getEntities = jest.fn();
  const renderPage = () =>
    renderInTestApp(
      <TestApiProvider apis={[[catalogApiRef, { getEntities }]]}>
        <HomePage />
        <LocationDisplay />
      </TestApiProvider>,
    );
  const lifecycleCard = () =>
    within(screen.getByRole('region', { name: 'Component lifecycles' }));
  const expectExplanation = () => {
    expect(
      lifecycleCard().getByText(/Counts use component lifecycle metadata/),
    ).toHaveTextContent('They do not report live service health.');
    expect(screen.queryByText('System Health')).not.toBeInTheDocument();
    expect(screen.queryByText('Overall Health')).not.toBeInTheDocument();
    expect(lifecycleCard().queryByText(/%/)).not.toBeInTheDocument();
  };

  beforeEach(() => {
    getEntities.mockReset();
  });

  it('counts component lifecycles, including custom and missing values, without claiming health', async () => {
    const components = [
      component('production-one', 'production'),
      component('production-two', 'production'),
      component('experiment', 'experimental'),
      component('old-service', 'deprecated'),
      component('preview', 'preview'),
      component('unspecified'),
      { ...component('no-spec'), spec: undefined },
    ];
    getEntities.mockImplementation(({ filter }) =>
      Promise.resolve({
        items:
          filter[0].kind === 'component' && Object.keys(filter[0]).length === 1
            ? components
            : [],
      }),
    );

    await renderPage();

    expectExplanation();
    const card = lifecycleCard();
    for (const [label, count] of [
      ['Production', '2'],
      ['Experimental', '1'],
      ['Deprecated', '1'],
      ['Other or unspecified', '3'],
    ]) {
      const term = card.getByText(label);
      expect(term.tagName).toBe('DT');
      expect(term.nextElementSibling).toHaveTextContent(
        new RegExp(`^${count}$`),
      );
    }
    expect(card.queryByRole('progressbar')).not.toBeInTheDocument();

    fireEvent.click(card.getByRole('button', { name: 'Browse components' }));
    expect(screen.getByTestId('location')).toHaveTextContent(
      '/catalog?filters[kind]=component',
    );
  });

  it('explains the data source while loading and does not show zero counts', async () => {
    getEntities.mockReturnValue(new Promise(() => {}));

    await renderPage();

    expectExplanation();
    expect(lifecycleCard().getByRole('status')).toHaveTextContent(
      'Loading component lifecycles...',
    );
    expect(lifecycleCard().queryByRole('definition')).not.toBeInTheDocument();
  });

  it('distinguishes an empty component catalog from unavailable data', async () => {
    getEntities.mockResolvedValue({ items: [] });

    await renderPage();

    expectExplanation();
    expect(
      lifecycleCard().getByText('No components found in the catalog.'),
    ).toBeInTheDocument();
    expect(lifecycleCard().queryByRole('alert')).not.toBeInTheDocument();
    expect(lifecycleCard().queryByRole('definition')).not.toBeInTheDocument();
  });

  it('reports unavailable data after a catalog failure without showing empty or zero counts', async () => {
    getEntities.mockRejectedValue(new Error('Catalog unavailable'));

    await renderPage();

    expectExplanation();
    expect(lifecycleCard().getByRole('alert')).toHaveTextContent(
      'Component lifecycle data is unavailable. Try reloading the page.',
    );
    expect(
      lifecycleCard().queryByText('No components found in the catalog.'),
    ).not.toBeInTheDocument();
    expect(lifecycleCard().queryByRole('definition')).not.toBeInTheDocument();
  });

  it('keeps loaded lifecycle counts when a later template request fails', async () => {
    getEntities.mockImplementation(({ filter }) => {
      if (filter[0].kind === 'template') {
        return Promise.reject(new Error('Templates unavailable'));
      }
      return Promise.resolve({
        items:
          filter[0].kind === 'component' && Object.keys(filter[0]).length === 1
            ? [component('production-service', 'production')]
            : [],
      });
    });

    await renderPage();

    expectExplanation();
    expect(
      lifecycleCard().getByText('Production').nextElementSibling,
    ).toHaveTextContent(/^1$/);
    expect(lifecycleCard().queryByRole('alert')).not.toBeInTheDocument();
  });
});
