## Goal

Migrate the Backstage theming system from legacy Material-UI with CSS-in-JS to Backstage Canon's CSS variable-based approach for better performance and future compatibility.

## Context

The current architecture uses:

- `@backstage/theme` package with `createUnifiedTheme`
- `UnifiedThemeProvider` for theme injection
- Custom color palette: darkTangerine, gold, pastelOrange, floralWhite, rootBeer
- MUI component style overrides
- Page-specific themes for different entity types

Canon architecture provides:

- CSS variable-based theming without CSS-in-JS
- Built-in light/dark mode support via `data-theme` attribute
- Responsive design system
- Component-specific CSS classes with `.canon-` prefix
- Comprehensive spacing and typography systems

## Implementation Checklist

### Planning

- [x] Requirements clarified
- [x] Codebase analyzed
- [ ] External docs researched (Canon documentation)
- [ ] Plan reviewed and approved

### Phase 1: Setup and Installation

- [ ] Install @backstage/canon package (files: `packages/app/package.json`)
- [ ] Create custom theme CSS file with Canon variables (files: `packages/app/src/theme/canon.css`)
- [ ] Configure CSS imports in main application (files: `packages/app/src/index.tsx`)

### Phase 2: Theme Migration

- [ ] Map current colors to Canon CSS variables (darkTangerine, gold, pastelOrange, etc.)
- [ ] Update typography configuration to Canon's font system
- [ ] Replace UnifiedThemeProvider with Canon theming approach (files: `packages/app/src/App.tsx`)
- [ ] Remove or refactor theme configuration (files: `packages/app/src/theme/index.ts`)

### Phase 3: Component Updates and Testing

- [ ] Test all existing components render correctly with Canon theming
- [ ] Update custom component styles to use Canon CSS class naming conventions
- [ ] Test responsive design across different screen sizes
- [ ] Validate light/dark mode switching works correctly

### Phase 4: Cleanup and Documentation

- [ ] Remove legacy theme-related imports and dependencies
- [ ] Clean up unused MUI theme configuration
- [ ] Update inline documentation for theme customization

### Testing

- [ ] Visual regression testing completed
- [ ] Manual testing across browsers (Chrome, Firefox, Safari)
- [ ] Accessibility testing completed
- [ ] Responsive testing on mobile/tablet/desktop

### Completion

- [ ] Code reviewed
- [ ] Documentation updated (if needed)
- [ ] Merged to main

## Files to Modify

| File                                  | Action        | Purpose                                   | Done |
| ------------------------------------- | ------------- | ----------------------------------------- | ---- |
| packages/app/package.json             | Modify        | Add @backstage/canon dependency           | [ ]  |
| packages/app/src/App.tsx              | Modify        | Update theme provider and imports         | [ ]  |
| packages/app/src/theme/index.ts       | Modify/Remove | Replace or remove MUI theme configuration | [ ]  |
| packages/app/src/theme/canon.css      | Create        | New Canon theme CSS file with variables   | [ ]  |
| packages/app/src/index.tsx            | Modify        | Add Canon CSS imports                     | [ ]  |
| packages/app/src/themes/brandTheme.ts | Modify/Remove | Migrate or remove brand themes            | [ ]  |

## Risks & Unknowns

- ⚠️ Visual inconsistencies during migration: Components may render differently. Mitigation: Incremental migration with side-by-side comparison testing.
- ⚠️ Component style regressions: Custom styled components may break. Mitigation: Thorough testing of all component variations.
- ⚠️ Theme switching functionality changes: Light/dark mode toggle may need reimplementation. Mitigation: Test theme switching early.
- ⚠️ Conflicts with existing custom styles: Existing CSS may conflict with Canon classes. Mitigation: Audit and update custom styles.
- ❓ Canon version compatibility: Need to verify Canon version compatible with current Backstage version.
- ❓ Page-specific theming: Current architecture uses different themes for entity types - need to understand Canon equivalent.

## Open Questions

- What version of @backstage/canon is compatible with our Backstage version?
- How should page-specific themes (different entity type themes) be handled in Canon?
- Should we maintain backward compatibility with the current theme system during migration?

## Research Notes

To be completed:

- [ ] Fetch Canon documentation from Context7
- [ ] Review Canon migration guide
- [ ] Check Canon GitHub for examples

## Change Log

- 2025-06-02T01:11:05: Initial draft created from prompt specification
