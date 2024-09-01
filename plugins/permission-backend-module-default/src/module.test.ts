import {
  PolicyQuery,
  PolicyQueryUser,
} from '@backstage/plugin-permission-node';
import {
  AuthorizeResult,
  PermissionAttributes,
} from '@backstage/plugin-permission-common';
import { DefaultPermissionPolicy } from './module';

describe('policy', () => {
  let policy: DefaultPermissionPolicy;
  const createRequest = (
    permissionName: string,
    attributes: PermissionAttributes = {},
  ): PolicyQuery => ({
    permission: {
      type: 'basic',
      name: permissionName,
      attributes: attributes,
    },
  });
  const createUser = (name: string, groups: string[]): PolicyQueryUser => ({
    identity: {
      type: 'user',
      userEntityRef: `user:default/${name}`,
      ownershipEntityRefs: groups.map(g => `group:default/${g}`),
    },
    token: 'example-token',
    info: {
      userEntityRef: `user:default/${name}`,
      ownershipEntityRefs: groups.map(g => `group:default/${g}`),
    },
    credentials: {
      $$type: '@backstage/BackstageCredentials',
      expiresAt: undefined,
      principal: undefined,
    },
  });

  beforeEach(() => {
    policy = new DefaultPermissionPolicy();
  });

  test('allows read permission for users in readGroups', async () => {
    const request = createRequest('example.permission', {
      action: 'read',
    });
    const user = createUser('example-user', ['readers']);

    const decision = await policy.handle(request, user);

    expect(decision.result).toBe(AuthorizeResult.ALLOW);
  });

  test('allows update permission for users in writeGroups', async () => {
    const request = createRequest('example.permission', {
      action: 'update',
    });
    const user = createUser('example-user', ['developers']);

    const decision = await policy.handle(request, user);

    expect(decision.result).toBe(AuthorizeResult.ALLOW);
  });

  test('allows create permission for users in writeGroups', async () => {
    const request = createRequest('example.permission', {
      action: 'create',
    });
    const user = createUser('example-user', ['developers']);

    const decision = await policy.handle(request, user);

    expect(decision.result).toBe(AuthorizeResult.ALLOW);
  });

  test('denies permission for users not in readGroups or writeGroups', async () => {
    const request = createRequest('example.permission', {
      action: 'create',
    });
    const user = createUser('example-user', ['readers']);

    const decision = await policy.handle(request, user);

    expect(decision.result).toBe(AuthorizeResult.DENY);
  });

  test('denies permission for unknown actions', async () => {
    const request = createRequest('example.permission', {
      action: undefined,
    });
    const user = createUser('example-user', ['developers']);

    const decision = await policy.handle(request, user);

    expect(decision.result).toBe(AuthorizeResult.DENY);
  });
});
