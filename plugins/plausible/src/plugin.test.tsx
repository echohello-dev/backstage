import React from 'react';
import { render } from '@testing-library/react';
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

  it('renders nothing when domain is not provided', () => {
    const config = mockConfigApi({ plausible: { enabled: true } });
    const { container } = render(
      <TestApiProvider apis={[[configApiRef, config]]}>
        <PlausibleAnalytics />
      </TestApiProvider>,
    );
    expect(container.firstChild).toBeNull();
  });

  it('renders script tag when plausible is enabled and domain is provided', () => {
    const config = mockConfigApi({
      plausible: {
        enabled: true,
        domain: 'example.com',
      },
    });
    const { container } = render(
      <TestApiProvider apis={[[configApiRef, config]]}>
        <PlausibleAnalytics />
      </TestApiProvider>,
    );
    const scriptTag = container.querySelector('script');
    expect(scriptTag).toBeInTheDocument();
    expect(scriptTag).toHaveAttribute('data-domain', 'example.com');
    expect(scriptTag).toHaveAttribute(
      'src',
      'https://plausible.io/js/script.js',
    );
    expect(scriptTag).toHaveAttribute('defer');
  });
});
