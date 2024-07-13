import { useApi, configApiRef } from '@backstage/core-plugin-api';
import React from 'react';

export const PlausibleAnalytics = () => {
  const config = useApi(configApiRef);
  const enabled = config.getOptionalBoolean('plausible.enabled') ?? false;
  const dataDomain = config.getOptionalString('plausible.dataDomain');
  const sourceDomain = config.getOptionalString('plausible.sourceDomain');
  const source = `https://${sourceDomain}/js/script.js`;

  if (!enabled || !dataDomain || !sourceDomain) {
    return null;
  }

  return <script defer data-domain={dataDomain} src={source} />;
};
