import { createBackendModule } from '@backstage/backend-plugin-api';
import {
  stringifyEntityRef,
  DEFAULT_NAMESPACE,
} from '@backstage/catalog-model';
import { githubAuthenticator } from '@backstage/plugin-auth-backend-module-github-provider';
import {
  authProvidersExtensionPoint,
  BackstageSignInResult,
  createOAuthProviderFactory,
} from '@backstage/plugin-auth-node';

export const githubAuth = createBackendModule({
  pluginId: 'auth',
  moduleId: 'github',
  register(reg) {
    reg.registerInit({
      deps: { providers: authProvidersExtensionPoint },
      async init({ providers }) {
        providers.registerProvider({
          // This ID must match the actual provider config, e.g. addressing
          // auth.providers.github means that this must be "github".
          providerId: 'github',
          // Use createProxyAuthProviderFactory instead if it's one of the proxy
          // based providers rather than an OAuth based one
          factory: createOAuthProviderFactory({
            authenticator: githubAuthenticator,
            async signInResolver(
              { result },
              ctx,
            ): Promise<BackstageSignInResult> {
              if (!result.fullProfile.username) {
                throw new Error('Username not found in profile');
              }

              const userEntity = stringifyEntityRef({
                kind: 'User',
                name: result.fullProfile.username,
                namespace: DEFAULT_NAMESPACE,
              });

              return ctx.issueToken({
                claims: {
                  sub: userEntity,
                  ent: [userEntity],
                },
              });
            },
          }),
        });
      },
    });
  },
});
