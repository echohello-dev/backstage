
import { createDevApp } from '@backstage/dev-utils';
import { plausiblePlugin } from '../src/plugin';

createDevApp().registerPlugin(plausiblePlugin).render();
