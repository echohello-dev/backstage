import { createPlugin } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const plausiblePlugin = createPlugin({
  id: 'plausible',
  routes: {
    root: rootRouteRef,
  },
});
