import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { PulseCheckPage } from './PulseCheckPage';

describe('PulseCheckPage', () => {
  const getEntities = jest.fn();
  const demoService = {
    apiVersion: 'backstage.io/v1alpha1',
    kind: 'Component',
    metadata: { name: 'demo-service' },
    spec: { type: 'service', lifecycle: 'experimental', owner: 'guest' },
  };

  const renderPage = () =>
    renderInTestApp(
      <TestApiProvider apis={[[catalogApiRef, { getEntities }]]}>
        <PulseCheckPage />
      </TestApiProvider>,
    );

  const expectSampleDataNotice = () => {
    expect(
      screen.getByText(
        'Sample data only. Service names come from the catalog. Health and uptime are simulated; incidents and deployment metrics are examples. This page does not report live service status.',
      ),
    ).toBeVisible();
    expect(
      screen.getByText('Explore a service health dashboard with sample data'),
    ).toBeInTheDocument();
  };

  beforeEach(() => {
    getEntities.mockReset();
  });

  it('identifies simulated health and fixture metrics on the populated dashboard', async () => {
    getEntities.mockResolvedValue({
      items: [demoService],
    });

    await renderPage();

    expectSampleDataNotice();
    expect(screen.getByText('demo-service')).toBeInTheDocument();
    expect(screen.getByText('Database connection timeout')).toBeInTheDocument();
    expect(screen.getByText('Total Deployments')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('keeps the sample-data notice visible while services load', async () => {
    getEntities.mockReturnValue(new Promise(() => {}));

    await renderPage();

    expectSampleDataNotice();
    expect(
      screen.getByRole('progressbar', { name: 'Loading services' }),
    ).toBeInTheDocument();
  });

  it('keeps the sample-data notice visible when the catalog fails', async () => {
    getEntities.mockRejectedValue(new Error('Catalog unavailable'));

    await renderPage();

    expectSampleDataNotice();
    expect(
      screen.getByRole('alert', { name: 'Could not load services' }),
    ).toHaveTextContent('Catalog unavailable');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(screen.queryByText('Total Deployments')).not.toBeInTheDocument();
  });

  it('retries a failed catalog load and restores the dashboard after a pending request', async () => {
    let resolveRetry: () => void;
    const retry = new Promise<{ items: (typeof demoService)[] }>(resolve => {
      resolveRetry = () => resolve({ items: [demoService] });
    });
    getEntities
      .mockRejectedValueOnce(new Error('Catalog unavailable'))
      .mockReturnValueOnce(retry);

    await renderPage();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expectSampleDataNotice();
    expect(
      screen.getByRole('progressbar', { name: 'Loading services' }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('alert', { name: 'Could not load services' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Retry' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByText('Total Deployments')).not.toBeInTheDocument();
    expect(getEntities).toHaveBeenCalledTimes(2);
    expect(getEntities).toHaveBeenLastCalledWith({
      filter: [{ kind: 'component', 'spec.type': 'service' }],
    });

    await act(async () => resolveRetry());

    expectSampleDataNotice();
    expect(screen.getByText('demo-service')).toBeInTheDocument();
    expect(screen.getByText('Total Deployments')).toBeInTheDocument();
    expect(
      screen.queryByRole('alert', { name: 'Could not load services' }),
    ).not.toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
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
      expect(
        screen.getByRole('alert', { name: 'Could not load services' }),
      ).toHaveTextContent('Still unavailable'),
    );
    expectSampleDataNotice();
    expect(screen.queryByText('Catalog unavailable')).not.toBeInTheDocument();
    expect(screen.queryByText('Total Deployments')).not.toBeInTheDocument();
    expect(
      screen.queryByText('No services found in the catalog.'),
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));

    expect(
      await screen.findByText('No services found in the catalog.'),
    ).toBeInTheDocument();
    expectSampleDataNotice();
    expect(screen.getByText('Total Deployments')).toBeInTheDocument();
    expect(
      screen.queryByRole('alert', { name: 'Could not load services' }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: 'Retry' }),
    ).not.toBeInTheDocument();
    expect(getEntities).toHaveBeenCalledTimes(3);
  });

  it('offers retry when the catalog rejects without an Error object', async () => {
    getEntities.mockRejectedValue(null);

    await renderPage();

    expectSampleDataNotice();
    expect(
      screen.getByRole('alert', { name: 'Could not load services' }),
    ).toHaveTextContent('The catalog is unavailable.');
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument();
    expect(screen.queryByText('Total Deployments')).not.toBeInTheDocument();
  });

  it('identifies example metrics even when the catalog has no services', async () => {
    getEntities.mockResolvedValue({ items: [] });

    await renderPage();

    expectSampleDataNotice();
    expect(
      screen.getByText('No services found in the catalog.'),
    ).toBeInTheDocument();
    expect(screen.getByText('Total Deployments')).toBeInTheDocument();
  });
});
