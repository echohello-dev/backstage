# Auth

Backstage provides a number of authentication strategies out of the box. These can be configured in the `app-config.yaml` file.

Refer to the [Backstage documentation](https://backstage.io/docs/auth/) for more information.

Since the [new backend](https://backstage.io/docs/backend-system/building-backends/index/) was introduced, authentication plugins have been abstracted away into a separate package. To reference the new authentication plugins, use the following import:

```typescript title="packages/backend/src/index.ts"
backend.add(import('@backstage/plugin-auth-backend-module-guest-provider'));
```

Refer to [Migrating to New Auth Services](https://backstage.io/docs/tutorials/auth-service-migration#migrating-the-backend) documentation for more information.

## This Project

This project will use GitHub and Guest authentication strategies.

### GitHub

To enable GitHub authentication, add the following configuration to the `app-config.yaml` file:

```diff
auth:
+ environment: development
  providers:
+   github:
+     development:
+       clientId: <client-id>
+       clientSecret: <client-secret>
+       signIn:
+         resolvers:
+           - resolver: emailMatchingUserEntityProfileEmail
```

Replace `<client-id>` and `<client-secret>` with the values from your GitHub OAuth application.

See [Backstage documentation](https://backstage.io/docs/auth/github/provider#resolvers) for more resolvers.

Note that the `environment` key is set to `development` to allow for the use of GitHub authentication in a local development environment. This can be changed to `production` for a production environment.

#### Additional Scopes

The `additionalScopes` key is used to request additional permissions from the user. In this case, we are requesting the `user:email` and `read:org` scopes.

```diff
auth:
+ environment: development
  providers:
+   github:
+     development:
+       clientId: <client-id>
+       clientSecret: <client-secret>
+       additionalScopes:
+         - user:email
+         - read:org
+       signIn:
+         resolvers:
+           - resolver: emailMatchingUserEntityProfileEmail
```

We can then query the users email and organisations using the fetch method:

```typescript
createOAuthProviderFactory({
  authenticator: githubAuthenticator,
  async signInResolver(
    {profile, result},
    ctx,
  ): Promise<BackstageSignInResult> {
    const emailResponse = await fetch(
      'https://api.github.com/user/emails',
      {
        headers: {
          Authorization: `Bearer ${result.session.accessToken}`,
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
          Authorization: `Bearer ${result.session.accessToken}`,
          Accept: 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      },
    );
    const orgs = await orgsResponse.json();
  })
})
```

### Guest

To enable Guest authentication, add the following configuration to the `app-config.yaml` file:

```diff
auth:
  providers:
+   guest:
+     dangerouslyAllowOutsideDevelopment: true
```

This will allow users to access the Backstage application without authenticating.
