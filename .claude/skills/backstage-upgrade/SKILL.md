---
name: backstage-upgrade
description: Upgrade Backstage to the latest stable or specific version. Use when user says "upgrade backstage", "update backstage", "bump backstage", "backstage versions", or when the backstage.json version is behind the latest stable release.
---

# Backstage Upgrade Skill

Use this skill when upgrading a Backstage monorepo to a newer version.

## When to activate this skill

- User asks to upgrade, update, or bump Backstage
- `backstage.json` version is behind latest stable
- User asks what version of Backstage is installed or available
- User asks how to upgrade Backstage

## Prerequisites

### Environment

- Yarn 4.1.1+ (check: `yarn --version`)
- Node.js 20+ or 22+ (check: `node --version`)
- Access to run `mise run` commands

### Recommended

- Backstage Yarn plugin installed (makes version management easier)
- Clean git state (commit or stash changes before upgrading)

## Vanilla-first policy

This repo should stay as close to the vanilla `create-app` template as possible. Every upgrade is a chance to remove drift, not add it.

- Apply the create-app template changes from the upgrade-helper diff by default. Skip one only when a deliberate customisation already lives in that file (custom theming, `@internal/*` plugins, RBAC policy, Plausible), and say so in the commit or PR body.
- When an upgrade breaks, use the fix vanilla adopters would need. A one-line entry in existing config (e.g. a `resolutions` workaround for an upstream packaging bug) beats vendored files, version pins, extra Docker layers, or forked patches.
- Do not add permanent deviations to structural files (`Dockerfile`, `tsconfig.json`, `app-config.yaml`, workspace manifests) beyond what the repo already customises for a documented reason.
- If a local workaround is unavoidable, keep it minimal, reference the upstream issue, and delete it once upstream is fixed.

## Upgrade Workflow

### Step 1: Check current state

```bash
# Check installed version
cat backstage.json

# Check latest stable version
yarn dlx @backstage/cli@latest --version 2>/dev/null || npx @backstage/cli@latest --version

# Check outdated packages
yarn outdated
```

### Step 2: Install the Backstage Yarn plugin (recommended)

The plugin auto-manages `@backstage/*` versions based on `backstage.json`:

```bash
yarn plugin import https://versions.backstage.io/v1/tags/main/yarn-plugin
```

This creates/updates `.yarnrc.yml` and `.yarn/`. Commit these changes.

### Step 3: Run versions bump

```bash
# Upgrade to latest stable
yarn backstage-cli versions:bump

# Or to a specific version
yarn backstage-cli versions:bump --release 1.51.0

# Or to the 'next' release line (weekly)
yarn backstage-cli versions:bump --release next

# Update custom plugins too (e.g., @roadiehq/*)
yarn backstage-cli versions:bump --pattern '@{backstage,roadiehq}/*'
```

This updates `backstage.json` and migrates package.json deps to use `backstage:^` if the yarn plugin is installed.

### Step 4: Reconcile with the vanilla template

The `create-app` template changes are NOT auto-applied. Fetch the upgrade-helper diff for the exact jump and work through it file by file:

```bash
# Use upgrade helper for diff between versions
open https://backstage.github.io/upgrade-helper/?from=<old>&to=<new>&yarnPlugin=1

# View changelog
yarn dlx @backstage/create-app@latest --version 2>/dev/null
```

Apply the template version of every changed file by default. Keep local edits only where this repo deliberately deviates (theming, `@internal/*` plugins, RBAC, Plausible), re-applied on top of the template's file rather than skipping the update. List anything kept back in the commit or PR body.

Key files that often change in templates:
- `packages/backend/src/index.ts`
- `packages/app/src/App.tsx`
- `packages/app/src/components/Root/Root.tsx`
- `app-config.yaml`
- `Dockerfile`

### Step 5: Install updated dependencies

```bash
mise run install
# Or: yarn install
```

### Step 6: Build and verify

```bash
mise run build:all
mise run lint
mise run test
```

### Step 7: Test locally

```bash
mise run dev
```

### Step 8: Commit

```bash
git add -A
git commit -m "chore: upgrade backstage to $(cat backstage.json)"
```

## Key Files

| File | Purpose |
|------|---------|
| `backstage.json` | Master Backstage version for the yarn plugin |
| `.yarnrc.yml` | Yarn configuration (includes plugin if installed) |
| `.yarn/plugins/` | Yarn plugin bundle |
| `packages/app/` | Frontend React app |
| `packages/backend/` | Node.js backend |
| `plugins/` | Custom plugins (scoped `@internal/`) |

## Troubleshooting

### Package mismatches after upgrade

```bash
# Dedupe packages
yarn dedupe
yarn install
```

### Build failures

```bash
# Clean and rebuild
mise run clean
mise run install
mise run build:all
```

### Lock file conflicts

```bash
rm yarn.lock
mise run install
```

### Proxy issues (corporate networks)

```bash
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
export NO_PROXY=localhost,internal.company.com
export NODE_USE_ENV_PROXY=1
export YARN_HTTP_PROXY=${HTTP_PROXY}
export YARN_HTTPS_PROXY=${HTTPS_PROXY}
```

## References

- [Keeping Backstage Updated](https://backstage.io/docs/getting-started/keeping-backstage-updated/)
- [Backstage Upgrade Helper](https://backstage.github.io/upgrade-helper/?yarnPlugin=0)
- [Backstage Releases](https://github.com/backstage/backstage/releases)
- [create-app Changelog](https://github.com/backstage/backstage/blob/master/packages/create-app/CHANGELOG.md)
