# Support & FAQ

How to get unstuck when something in the portal isn't working.

## Where to get help

1. **This documentation** — start with [Getting Started](index.md).
2. **The catalog** — every entity lists an owner. For questions about a
   specific service or API, contact the owning team shown on the entity page.
3. **Platform Engineering** — owns the portal itself (search, scaffolder,
   TechDocs, catalog ingestion). See the `platform-engineering` group in the
   catalog for current members.

## Frequently asked questions

### My component doesn't show up in the catalog

- Confirm the repo has a `catalog-info.yaml` at its root.
- Confirm the file is registered: use
  [Catalog Import](/catalog-import) to locate and register it.
- Check for YAML syntax errors; a single bad entity file can be rejected by
  the catalog ingestion loop.

### My TechDocs site isn't building

- Confirm the entity has the `backstage.io/techdocs-ref` annotation.
- Confirm `mkdocs.yml` exists at the referenced path and includes the
  `techdocs-core` plugin.
- Docs build on first read; the first page load can take a minute.

### A scaffolder run failed

- Open the failed task from [Self-Service](/self-service) and expand the
  step logs — the failing step is highlighted.
- Most failures are permissions: the scaffolder needs a token with write
  access to the target GitHub org or GitLab group.

### How do I add a new software template?

Templates live under `examples/templates/` in the portal repository. Add a
folder with a `template.yaml` and a `template/` skeleton, tag it
`recommended` plus a `family:` tag, and it appears on the homepage and the
Self-Service page automatically.
