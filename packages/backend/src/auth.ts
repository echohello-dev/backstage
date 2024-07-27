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
              fullProfile,
              ctx,
            ): Promise<BackstageSignInResult> {
              const { profile } = fullProfile;
              // if (!profile.email) {
              //   throw new Error(
              //     'Login failed, user profile does not contain an email',
              //   );
              // }

              const emailResponse = await fetch(
                'https://api.github.com/user/emails',
                {
                  headers: {
                    Authorization: `Bearer ${fullProfile.result.session.accessToken}`,
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                  },
                },
              );
              const emails = await emailResponse.json();

              // Fetch user's organizations
              const orgsResponse = await fetch(
                'https://api.github.com/user/orgs',
                {
                  headers: {
                    Authorization: `Bearer ${fullProfile.result.session.accessToken}`,
                    Accept: 'application/vnd.github+json',
                    'X-GitHub-Api-Version': '2022-11-28',
                  },
                },
              );
              const orgs = await orgsResponse.json();

              // Split the email into the local part and the domain.
              const [localPart, domain] = profile.email.split('@');

              // Next we verify the email domain. It is recommended to include this
              // kind of check if you don't look up the user in an external service.
              if (domain !== 'johnnyhuy.com') {
                throw new Error(
                  `Login failed, '${profile.email}' does not belong to the expected domain`,
                );
              }

              // By using `stringifyEntityRef` we ensure that the reference is formatted correctly
              const userEntity = stringifyEntityRef({
                kind: 'User',
                name: localPart,
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
