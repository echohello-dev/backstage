import { useApi, configApiRef } from '@backstage/core-plugin-api';
import React from 'react';

export const PlausibleAnalytics = () => {
  const config = useApi(configApiRef);
  const enabled = config.getOptionalBoolean('plausible.enabled') ?? false;
  const domain = config.getOptionalString('plausible.domain');

  if (!enabled || !domain) {
    return null;
  }

  return (
    <script
      defer
      data-domain={domain}
      src="https://plausible.io/js/script.js"
    />
  );
};
