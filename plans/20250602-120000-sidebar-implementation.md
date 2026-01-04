## Goal

Build three unimplemented sidebar pages (Scorecard, Pulse Check, Explore), replace mock data in HomePage with live Catalog API data, and implement CI/CD tab content for service entities.

## Context

### Current State

**✅ Implemented:**

- Custom homepage with rich dashboard UI (mock data)
- Custom search page with filters
- Comprehensive entity pages for all catalog kinds
- Custom analytics plugin (Plausible)
- Custom RBAC/permissions backend module
- Custom GitHub-inspired themes (3 themes total)
- Standard Backstage features: Catalog, TechDocs, Scaffolder, API Docs, Notifications

**⚠️ Placeholder/Incomplete:**

- Scorecard (`/scorecard`) - Sidebar link exists but no route implementation
- Pulse Check (`/pulse-check`) - Sidebar link exists but no route implementation
- Explore (`/explore`) - Sidebar link exists but no route implementation
- CI/CD tab on service entities - Shows placeholder message
- HomePage metrics - Uses hardcoded/mock data

### Technical Patterns

- Use `Page` from `@backstage/core-components`
- Use MUI v5 components (`@mui/material`)
- Use `@mui/x-charts` for visualizations
- Use Catalog API via `catalogApiRef` for data
- Icons from `@primer/octicons-react` and `@mui/icons-material`

## Implementation Checklist

### Planning

- [x] Requirements clarified
- [x] Codebase analyzed
- [ ] External docs researched
- [ ] Plan reviewed and approved

### Phase 1: Scorecard Page

- [ ] Create ScorecardPage.tsx main component (files: `packages/app/src/components/scorecard/ScorecardPage.tsx`)
- [ ] Create EntityScoreCard.tsx for individual scores (files: `packages/app/src/components/scorecard/EntityScoreCard.tsx`)
- [ ] Create ScoreMetrics.tsx for aggregated charts (files: `packages/app/src/components/scorecard/ScoreMetrics.tsx`)
- [ ] Create index.ts export (files: `packages/app/src/components/scorecard/index.ts`)
- [ ] Register route in App.tsx (files: `packages/app/src/App.tsx`)
- [ ] Implement Catalog API integration for entity quality metrics
- [ ] Add scoring logic (docs coverage, CI/CD adoption, ownership completeness)

### Phase 2: Pulse Check Page

- [ ] Create PulseCheckPage.tsx main component (files: `packages/app/src/components/pulse-check/PulseCheckPage.tsx`)
- [ ] Create SystemHealthCard.tsx for service health (files: `packages/app/src/components/pulse-check/SystemHealthCard.tsx`)
- [ ] Create IncidentTimeline.tsx for recent incidents (files: `packages/app/src/components/pulse-check/IncidentTimeline.tsx`)
- [ ] Create DeploymentMetrics.tsx for deployment health (files: `packages/app/src/components/pulse-check/DeploymentMetrics.tsx`)
- [ ] Create index.ts export (files: `packages/app/src/components/pulse-check/index.ts`)
- [ ] Register route in App.tsx (files: `packages/app/src/App.tsx`)
- [ ] Implement health check API calls (mock initially, then integrate)

### Phase 3: Explore Page

- [ ] Create ExplorePage.tsx main component (files: `packages/app/src/components/explore/ExplorePage.tsx`)
- [ ] Create ToolCard.tsx for individual tools (files: `packages/app/src/components/explore/ToolCard.tsx`)
- [ ] Create ToolGrid.tsx for grid layout (files: `packages/app/src/components/explore/ToolGrid.tsx`)
- [ ] Create CategoryFilter.tsx for filtering (files: `packages/app/src/components/explore/CategoryFilter.tsx`)
- [ ] Create toolsConfig.ts with tool definitions (files: `packages/app/src/components/explore/toolsConfig.ts`)
- [ ] Create index.ts export (files: `packages/app/src/components/explore/index.ts`)
- [ ] Register route in App.tsx (files: `packages/app/src/App.tsx`)

### Phase 4: HomePage Live Data

- [ ] Replace mock service count with Catalog API (files: `packages/app/src/components/home/HomePage.tsx`)
- [ ] Replace mock API count with Catalog API
- [ ] Replace mock component count with Catalog API
- [ ] Add ownership metrics from Catalog API
- [ ] Add loading states and error handling

### Phase 5: CI/CD Tab Implementation

- [ ] Install @backstage/plugin-github-actions (files: `packages/app/package.json`)
- [ ] Add EntityGithubActionsContent to service entity page (files: `packages/app/src/components/catalog/EntityPage.tsx`)
- [ ] Configure GitHub integration in app-config (files: `app-config.yaml`)
- [ ] Add entity annotation documentation for users

### Testing

- [ ] Unit tests for new components
- [ ] Integration tests for API calls
- [ ] Manual testing of all new pages
- [ ] Responsive testing

### Completion

- [ ] Code reviewed
- [ ] Documentation updated (if needed)
- [ ] Merged to main

## Files to Modify

| File                                                          | Action | Purpose                              | Done |
| ------------------------------------------------------------- | ------ | ------------------------------------ | ---- |
| packages/app/src/components/scorecard/ScorecardPage.tsx       | Create | Main scorecard page                  | [ ]  |
| packages/app/src/components/scorecard/EntityScoreCard.tsx     | Create | Individual score display             | [ ]  |
| packages/app/src/components/scorecard/ScoreMetrics.tsx        | Create | Aggregated metrics charts            | [ ]  |
| packages/app/src/components/scorecard/index.ts                | Create | Module export                        | [ ]  |
| packages/app/src/components/pulse-check/PulseCheckPage.tsx    | Create | Main pulse check page                | [ ]  |
| packages/app/src/components/pulse-check/SystemHealthCard.tsx  | Create | Service health display               | [ ]  |
| packages/app/src/components/pulse-check/IncidentTimeline.tsx  | Create | Incident timeline                    | [ ]  |
| packages/app/src/components/pulse-check/DeploymentMetrics.tsx | Create | Deployment metrics                   | [ ]  |
| packages/app/src/components/pulse-check/index.ts              | Create | Module export                        | [ ]  |
| packages/app/src/components/explore/ExplorePage.tsx           | Create | Main explore page                    | [ ]  |
| packages/app/src/components/explore/ToolCard.tsx              | Create | Tool card component                  | [ ]  |
| packages/app/src/components/explore/ToolGrid.tsx              | Create | Grid layout                          | [ ]  |
| packages/app/src/components/explore/CategoryFilter.tsx        | Create | Category filter                      | [ ]  |
| packages/app/src/components/explore/toolsConfig.ts            | Create | Tool definitions                     | [ ]  |
| packages/app/src/components/explore/index.ts                  | Create | Module export                        | [ ]  |
| packages/app/src/App.tsx                                      | Modify | Add routes for new pages             | [ ]  |
| packages/app/src/components/home/HomePage.tsx                 | Modify | Replace mock data with Catalog API   | [ ]  |
| packages/app/src/components/catalog/EntityPage.tsx            | Modify | Add GitHub Actions CI/CD content     | [ ]  |
| packages/app/package.json                                     | Modify | Add @backstage/plugin-github-actions | [ ]  |
| app-config.yaml                                               | Modify | Add GitHub integration config        | [ ]  |

## Risks & Unknowns

- ⚠️ API rate limits: GitHub API has rate limits that could affect CI/CD data. Mitigation: Implement caching and error handling.
- ⚠️ Performance with large catalogs: Scorecard calculations over many entities may be slow. Mitigation: Implement pagination and lazy loading.
- ⚠️ Mock data mismatch: Some HomePage features may not have equivalent live data sources. Mitigation: Identify gaps early and prioritize.
- ❓ Scorecard metrics source: Should metrics come from Catalog API metadata, a dedicated plugin (like tech-insights), or custom annotations?
- ❓ Pulse Check data sources: Should health checks use Backstage endpoints, external monitoring (Grafana/Datadog), or deployment systems?
- ❓ Explore page content: Should this show internal tools only, or also community plugins?
- ❓ CI/CD systems: Which CI/CD systems are in use (GitHub Actions, GitLab CI, Jenkins)?

## Open Questions

1. What CI/CD systems are being used? This determines which plugins to install.
2. Should Scorecard metrics be stored/cached, or calculated on-the-fly?
3. What external monitoring tools (if any) should Pulse Check integrate with?
4. What tools/resources should appear on the Explore page?
5. Is there a preference for mock data fallbacks when live data is unavailable?

## Research Notes

Potential dependencies:

- `@backstage/plugin-github-actions` - GitHub Actions integration
- `@backstage/plugin-tech-insights` - For advanced scorecard metrics
- `@mui/x-data-grid` - For advanced tables in Scorecard

## Change Log

- 2025-06-02T12:00:00: Initial draft created from prompt specification
