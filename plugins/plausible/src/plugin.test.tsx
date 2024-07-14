import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { ConfigApi, configApiRef } from '@backstage/core-plugin-api';
import { TestApiProvider } from '@backstage/test-utils';
import { PlausibleAnalytics } from './components/PlausibleAnalytics';
import { ConfigReader } from '@backstage/core-app-api';

describe('PlausibleAnalytics', () => {
  const mockConfigApi = (config: object): ConfigApi => {
    return ConfigReader.fromConfigs([
      { data: config, context: 'mock-context' },
    ]);
  };

  it('renders nothing when plausible is disabled', () => {
    const config = mockConfigApi({ plausible: { enabled: false } });
    const { container } = render(
      <TestApiProvider apis={[[configApiRef, config]]}>
        <PlausibleAnalytics />
      </TestApiProvider>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders nothing when domain is provided but disabled', () => {
    const config = mockConfigApi({
      plausible: { enabled: false, domain: 'example.com' },
    });
    const { container } = render(
      <TestApiProvider apis={[[configApiRef, config]]}>
        <PlausibleAnalytics />
      </TestApiProvider>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders script tag when plausible is configured', async () => {
    const config = mockConfigApi({
      plausible: {
        enabled: true,
        dataDomain: 'example.com',
        sourceUrl: 'https://plausible.example.com/js/script.js',
      },
    });
    render(
      <TestApiProvider apis={[[configApiRef, config]]}>
        <PlausibleAnalytics />
      </TestApiProvider>,
    );

    await waitFor(() => {
      const scriptTag = document.querySelector(
        'script[data-domain="example.com"]',
      );
      expect(scriptTag).toBeInTheDocument();
      expect(scriptTag).toHaveAttribute('data-domain', 'example.com');
      expect(scriptTag).toHaveAttribute(
        'src',
        'https://plausible.example.com/js/script.js',
      );
      expect(scriptTag).toHaveAttribute('defer');
    });
  });
});
