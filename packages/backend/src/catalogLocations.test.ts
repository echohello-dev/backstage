import { readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { ConfigReader } from '@backstage/config';
import { parse } from 'yaml';

const backendDirectory = resolve(__dirname, '..');
const repositoryDirectory = resolve(backendDirectory, '../..');

describe.each(['app-config.example.yaml', 'app-config.production.yaml'])(
  '%s catalog locations',
  configFile => {
    const config = new ConfigReader(
      parse(readFileSync(resolve(repositoryDirectory, configFile), 'utf8')),
    );
    const fileLocations = config
      .getConfigArray('catalog.locations')
      .filter(location => location.getString('type') === 'file')
      .map(location => location.getString('target'));

    it('loads the aggregate sample catalog', () => {
      expect(fileLocations).toContain('../../examples/all.yaml');
    });

    it.each(fileLocations)('can read the file location %s', target => {
      // Backstage resolves file locations from the backend package directory.
      const locationPath = resolve(backendDirectory, target);
      expect(statSync(locationPath).isFile()).toBe(true);
      expect(readFileSync(locationPath, 'utf8').trim()).not.toBe('');
    });
  },
);
