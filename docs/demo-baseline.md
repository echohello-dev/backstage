# Demo baseline

This page states what a visitor gets in the public demo. It describes the configuration in this repository, not a wishlist.

## Sign-in options

The sign-in page offers three providers, wired in `packages/app/src/App.tsx`.

- Guest. No account needed. This is the demo path.
- GitHub. Needs the production GitHub OAuth and app credentials.
- GitLab. Needs the production GitLab token.

## What a guest can do

Guest signs in as `user:default/guest`. The entity is defined in `examples/users/guest.yaml` and belongs to the `readers` group in `examples/groups/readers.yaml`.

With `permission.enabled: true`, the policy in `plugins/permission-backend-module-default/src/module.ts` gives `readers` read access only. A guest can browse the catalog, read TechDocs, use search, open the API explorer, view the catalog graph and browse the showcase and software templates.

## What a guest cannot do

A guest cannot create, update or delete catalog entities, cannot run scaffolder templates, and cannot cancel scaffolder tasks. Those actions need the `developers` group in `examples/groups/developers.yaml`. The `admins` group in `examples/groups/admins.yaml` exists for administrative membership and does not on its own grant extra policy rules today.

Template cards are safe for a guest to open and read. Submitting one will be denied by the permission policy.

## Configuration behind this

- `app-config.yaml` sets the guest `userEntityRef` to `user:default/guest` for local development.
- `app-config.production.yaml` sets the same reference and adds `dangerouslyAllowOutsideDevelopment: true`, which is required for guest access outside development. Treat a public deployment as read-only for visitors on that basis.
- Local development uses an in-memory SQLite database, so catalog changes made locally do not survive a restart. That is fine for trying the portal and is not a shared demo database.

## Known limits

- Signed-in GitHub and GitLab users only get write access if their catalog user belongs to `developers`. Membership is managed in the catalog entities, not in the OAuth provider.
- The demo data under `examples/` is sample data. It proves the portal surfaces work and is not real service ownership data.
