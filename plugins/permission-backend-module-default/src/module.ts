import { createBackendModule } from '@backstage/backend-plugin-api';
import {
  PolicyDecision,
  AuthorizeResult,
} from '@backstage/plugin-permission-common';
import {
  PermissionPolicy,
  PolicyQuery,
  PolicyQueryUser,
} from '@backstage/plugin-permission-node';
import { policyExtensionPoint } from '@backstage/plugin-permission-node/alpha';

export const readGroups = [
  'group:default/readers',
  'group:development/readers',
  'group:production/readers',
];
export const writeGroups = [
  'group:default/developers',
  'group:development/developers',
  'group:production/developers',
];
export const adminGroups = [
  'group:default/admins',
  'group:development/admins',
  'group:production/admins',
];

export class DefaultPermissionPolicy implements PermissionPolicy {
  async handle(
    request: PolicyQuery,
    user?: PolicyQueryUser,
  ): Promise<PolicyDecision> {
    if (
      request.permission.attributes.action === 'read' &&
      user?.identity.ownershipEntityRefs.some(ref => readGroups.includes(ref))
    ) {
      return { result: AuthorizeResult.ALLOW };
    }

    if (
      (request.permission.attributes.action === 'create' ||
        request.permission.attributes.action === 'delete' ||
        request.permission.attributes.action === 'update') &&
      user?.identity.ownershipEntityRefs.some(ref => writeGroups.includes(ref))
    ) {
      return { result: AuthorizeResult.ALLOW };
    }

    // Fall back to default deny
    return { result: AuthorizeResult.DENY };
  }
}

export const permissionModuleDefault = createBackendModule({
  pluginId: 'permission',
  moduleId: 'default',
  register(reg) {
    reg.registerInit({
      deps: { policy: policyExtensionPoint },
      async init({ policy }) {
        policy.setPolicy(new DefaultPermissionPolicy());
      },
    });
  },
});
