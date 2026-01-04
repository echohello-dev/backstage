# backstage-canon-migration

Created: `2025-06-02 01:11:05 AEST`
Status: `planned`

## Problem Statement

The current Backstage instance uses the legacy Material-UI theming system with custom theme configuration. Backstage Canon is the new design library that provides better consistency, performance, and modern styling approaches using CSS variables instead of CSS-in-JS. The migration is needed to:

- Adopt the modern Backstage design system standards
- Improve performance by removing CSS-in-JS overhead
- Gain access to improved theming capabilities with CSS variables
- Ensure future compatibility with Backstage's design direction
- Leverage Canon's responsive design and accessibility improvements

## Success Criteria

- [ ] Install and configure @backstage/canon package
- [ ] Replace current MUI theme provider with Canon theming system
- [ ] Migrate custom color palette to Canon CSS variables
- [ ] Update typography configuration to use Canon's system
- [ ] Implement custom theme CSS file with light/dark mode support
- [ ] Verify all components render correctly with new theming
- [ ] Test responsive design across different screen sizes
- [ ] Validate accessibility improvements
- [ ] Remove deprecated theme-related dependencies
- [ ] Update documentation for future theme customizations

## Implementation

### Phase 1: Setup and Installation

Install Backstage Canon and configure basic CSS imports to prepare for migration.

#### Task 1.1: Install Canon Dependencies

Install the @backstage/canon package and configure initial CSS imports in the main application.

#### Task 1.2: Create Custom Theme CSS

Create a custom theme.css file that defines Canon CSS variables for light and dark modes, mapping current theme values.

#### Task 1.3: Configure CSS Imports

Update the main application to import Canon's core CSS and custom theme files.

### Phase 2: Theme Migration

Replace the current MUI theme system with Canon's CSS variable-based theming.

#### Task 2.1: Map Current Colors to Canon Variables

Convert the existing color palette (darkTangerine, gold, pastelOrange, etc.) to Canon CSS variable format.

#### Task 2.2: Update Typography Configuration

Migrate typography settings to Canon's font system using CSS variables.

#### Task 2.3: Replace Theme Provider

Replace UnifiedThemeProvider with Canon's theming approach and update App.tsx.

### Phase 3: Component Updates and Testing

Ensure all components work correctly with the new theming system and test across different scenarios.

#### Task 3.1: Test Component Rendering

Verify all existing components render correctly with Canon theming.

#### Task 3.2: Update Custom Styling

Update any custom component styles to use Canon's CSS class naming conventions.

#### Task 3.3: Responsive Testing

Test the application across different screen sizes to ensure responsive design works correctly.

### Phase 4: Cleanup and Documentation

Remove legacy theme dependencies and document the new theming approach.

#### Task 4.1: Remove Legacy Dependencies

Clean up old theme-related imports and dependencies that are no longer needed.

#### Task 4.2: Update Documentation

Create documentation for how to customize themes using Canon's CSS variable system.

## Technical Specifications

### Architecture Context

The current architecture uses:

- `@backstage/theme` package with `createUnifiedTheme`
- `UnifiedThemeProvider` for theme injection
- Custom color palette and typography configuration
- MUI component style overrides
- Page-specific themes for different entity types

Canon architecture provides:

- CSS variable-based theming without CSS-in-JS
- Built-in light/dark mode support via `data-theme` attribute
- Responsive design system
- Component-specific CSS classes with `.canon-` prefix
- Comprehensive spacing and typography systems

### Security Requirements

- Ensure theme files are properly served and cached
- Validate that CSS variables don't introduce XSS vulnerabilities
- Maintain content security policy compliance

### Performance Requirements

- Reduce bundle size by removing CSS-in-JS overhead
- Improve runtime performance with native CSS variables
- Ensure theme switching is performant
- Maintain fast initial page load times

## File Modifications Required

- `packages/app/package.json` - Add @backstage/canon dependency
- `packages/app/src/App.tsx` - Update theme provider and imports
- `packages/app/src/theme/index.ts` - Replace or remove MUI theme configuration
- `packages/app/src/theme/canon.css` - New Canon theme CSS file
- `packages/app/src/index.tsx` - Add Canon CSS imports

## Environment Variables & Secrets

No environment variables or secrets required for this migration.

## Dependencies & Prerequisites

- @backstage/canon package (latest version)
- Understanding of CSS variables and Canon's theming system
- Access to current theme values for migration mapping
- Testing capabilities across different browsers and screen sizes

## Risk Assessment

**Medium Risk Factors:**

- Visual inconsistencies during migration
- Component style regressions
- Theme switching functionality changes
- Potential conflicts with existing custom styles

**Mitigation Strategies:**

- Incremental migration with testing at each step
- Side-by-side comparison testing
- Fallback plan to revert changes if needed
- Thorough testing across all application features

**Low Risk Factors:**

- Performance improvements expected
- Canon is actively maintained by Backstage team
- Well-documented migration path available

## Progress Log

### 2025-06-02 01:11:05 AEST - backstage-canon-migration

- Initial task specification created
- Requirements gathered and analyzed
- Current theming system examined (MUI with UnifiedThemeProvider)
- Identified custom color palette: darkTangerine, gold, pastelOrange, floralWhite, rootBeer
- Found custom typography and component overrides
- Canon documentation reviewed for migration approach
- Implementation plan created with 4 phases and detailed tasks
- Ready for implementation approval
