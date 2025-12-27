# App theming (Brand + Primer)

This app uses Backstage’s Unified Theming API (via `UnifiedThemeProvider` + `createUnifiedTheme`).

## Switching themes

- In the UI: open **User Settings** → **Appearance** → pick **Brand Light** or **Brand Dark**.
- If you don’t see the theme picker, ensure the app has more than one registered theme in the frontend.

## Where theme tokens live

- Brand themes: `packages/backstage-theme-github/src/index.ts` (package: `@internal/backstage-theme-github`)
  - `brandLightTheme`
  - `brandDarkTheme`
- Existing app theme: `packages/app/src/theme/index.ts` (`backstageTheme`)

The brand themes are intentionally subtle and mostly reuse Backstage base palettes.

## Backstage UI CSS variable overrides

`packages/backstage-theme-github/src/styles.css` contains minimal overrides for Backstage UI CSS variables.

- The overrides are scoped to:
  - `[data-theme-mode='light']`
  - `[data-theme-mode='dark']`
- No element resets are applied (to avoid breaking existing Backstage/MUI styling).
- The CSS is imported once from the app entrypoint via `@internal/backstage-theme-github/src/styles.css`.

## Primer (GitHub design system) integration

Primer is added for incremental, isolated usage.

- Dependency: `@primer/react`
- Demo component: `packages/app/src/components/PrimerDemo.tsx`
- Demo page: `packages/app/src/components/PrimerDemoPage.tsx` mounted at `/primer-demo`

How we avoid global styling conflicts:

- We do **not** wrap the entire Backstage app in Primer providers.
- Primer `BaseStyles` is applied only inside the demo component subtree.
- The page itself still uses Backstage layout components (`Page`, `Header`, `Content`).

If you see unexpected styling changes outside the demo page, it likely means Primer styles escaped scope (which should not happen with the current setup).
