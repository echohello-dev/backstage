import { useApi, configApiRef } from '@backstage/core-plugin-api';
import React from 'react';
import { Helmet } from 'react-helmet';
import { usePlausible } from '../hooks';

export const PlausibleAnalytics = () => {
  const config = useApi(configApiRef);
  const { trackEvent } = usePlausible();

  trackEvent('pageview');
};
