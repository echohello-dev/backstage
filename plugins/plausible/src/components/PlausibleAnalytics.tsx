import { useApi, configApiRef } from '@backstage/core-plugin-api';
import React from 'react';
import { Helmet } from 'react-helmet';

export const PlausibleAnalytics = () => {
  const config = useApi(configApiRef);
  const enabled = config.getOptionalBoolean('plausible.enabled') ?? false;
  const dataDomain = config.getOptionalString('plausible.dataDomain');
  const sourceUrl = config.getOptionalString('plausible.sourceUrl');

  if (!enabled || !dataDomain || !sourceUrl) {
    return null;
  }

  return (
    <Helmet>
      <script defer data-domain={dataDomain} src={sourceUrl} />
    </Helmet>
  );
};
