import { screen } from '@testing-library/react';
import { renderInTestApp, TestApiProvider } from '@backstage/test-utils';
import { catalogApiRef } from '@backstage/plugin-catalog-react';
import { PulseCheckPage } from './PulseCheckPage';

describe('PulseCheckPage', () => {
  const getEntities = jest.fn();

  const renderPage = () =>
    renderInTestApp(
      <TestApiProvider apis={[[catalogApiRef, { getEntities }]]}>
        <PulseCheckPage />
      </TestApiProvider>,
    );

  const expectSampleDataNotice = () => {
    expect(screen.getByRole('alert')).toHaveTextContent(
      'Sample data only. Service names come from the catalog. Health and uptime are simulated; incidents and deployment metrics are examples. This page does not report live service status.',
    );
    expect(
      screen.getByText('Explore a service health dashboard with sample data'),
    ).toBeInTheDocument();
  };

  beforeEach(() => {
    getEntities.mockReset();
  });

  it('identifies simulated health and fixture metrics on the populated dashboard', async () => {
    getEntities.mockResolvedValue({
      items: [
        {
          apiVersion: 'backstage.io/v1alpha1',
          kind: 'Component',
          metadata: { name: 'demo-service' },
          spec: { type: 'service', lifecycle: 'experimental', owner: 'guest' },
        },
      ],
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
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('keeps the sample-data notice visible when the catalog fails', async () => {
    getEntities.mockRejectedValue(new Error('Catalog unavailable'));

    await renderPage();

    expectSampleDataNotice();
    expect(
      screen.getByText('Error loading services: Catalog unavailable'),
    ).toBeInTheDocument();
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
