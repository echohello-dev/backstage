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
import {
  actionExecutePermission,
  taskCancelPermission,
} from '@backstage/plugin-scaffolder-common/alpha';

export const readGroups = ['group:default/readers'];
export const writeGroups = ['group:default/developers'];
export const adminGroups = ['group:default/admins'];

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
      (request.permission.name === taskCancelPermission.name ||
        request.permission.name === actionExecutePermission.name ||
        request.permission.attributes.action === 'create' ||
        request.permission.attributes.action === 'read' ||
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
