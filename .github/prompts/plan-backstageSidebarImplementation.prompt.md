# Plan: Implement Missing Sidebar Pages & Connect Live Data

Your Backstage app has three unimplemented sidebar navigation items (Scorecard, Pulse Check, Explore) and a custom HomePage using mock data. This plan will help you build these features and integrate real data sources.

## Steps

1. **Implement Scorecard page** at `packages/app/src/components/scorecard/ScorecardPage.tsx` with entity quality metrics (docs coverage, CI/CD adoption, ownership completeness) and register route in App.tsx

2. **Implement Pulse Check page** at `packages/app/src/components/pulse-check/PulseCheckPage.tsx` for system health monitoring (API status checks, incident summaries, deployment success rates) and register route in App.tsx

3. **Implement Explore page** at `packages/app/src/components/explore/ExplorePage.tsx` for discovering tools, plugins, and resources (categorized cards, search/filter capability) and register route in App.tsx

4. **Replace mock data in HomePage** at `packages/app/src/components/home/HomePage.tsx` by integrating Backstage Catalog API for entity counts and ownership metrics

5. **Implement CI/CD tab content** in service entity pages at `packages/app/src/components/catalog/EntityPage.tsx` by adding GitHub Actions, GitLab CI, or Jenkins integration components

## Further Considerations

1. **Scorecard metrics source** — Should quality metrics come from the Catalog API metadata, a dedicated scoring plugin (like Spotify's `backstage-plugin-tech-insights`), or custom entity annotations?

2. **Pulse Check data sources** — Should health checks use Backstage health endpoints, integrate with external monitoring (Grafana/Datadog), or query deployment systems (GitHub Actions/ArgoCD) directly?

3. **Explore page content** — Should this showcase internal tools/plugins only, or also include Backstage community plugins available for installation? Do you want to track tool usage/popularity?

4. **CI/CD integrations** — Which CI/CD systems are you using? GitHub Actions, GitLab CI, Jenkins, CircleCI, or multiple? This determines which Backstage plugins to install (`@backstage/plugin-github-actions`, `@backstage/plugin-jenkins`, etc.)

## Current State

### ✅ What's Implemented

- Custom homepage with rich dashboard UI (mock data)
- Custom search page with filters
- Comprehensive entity pages for all catalog kinds
- Custom analytics plugin (Plausible)
- Custom RBAC/permissions backend module
- Custom GitHub-inspired themes (3 themes total)
- Integration of Primer React components (demo page)
- Standard Backstage features: Catalog, TechDocs, Scaffolder, API Docs, Notifications

### ⚠️ Placeholder/Incomplete Items

- **Scorecard** - Sidebar link exists but no route implementation
- **Pulse Check** - Sidebar link exists but no route implementation
- **Explore** - Sidebar link exists but no route implementation
- **CI/CD tab** on service entities - Shows placeholder message (no actual CI/CD integration)
- **HomePage metrics** - Uses hardcoded/mock data (not connected to real systems)

## Sidebar Navigation Items

1. **Search** (`/search`) - ✅ Implemented
2. **Home** (`/`) - ✅ Custom homepage (mock data)
3. **Catalog** (`/catalog`) - ✅ Implemented
4. **APIs** (`/api-docs`) - ✅ Implemented
5. **Docs** (`/docs`) - ✅ Implemented
6. **Self-Service** (`/self-service`) - ✅ Implemented
7. **Notifications** (`/notifications`) - ✅ Implemented
8. **Scorecard** (`/scorecard`) - ⚠️ Not implemented
9. **Pulse Check** (`/pulse-check`) - ⚠️ Not implemented
10. **Explore** (`/explore`) - ⚠️ Not implemented
11. **Settings** (`/settings`) - ✅ Implemented

## Implementation Details

### 1. Scorecard Page (`/scorecard`)

**Purpose:** Entity quality metrics and health scoring dashboard

**Suggested Features:**

- **Entity Quality Metrics**
  - Documentation coverage (% with TechDocs)
  - CI/CD adoption rate
  - Ownership completeness (owned by valid groups)
  - API definition coverage
  - Dependency freshness
- **Scoring System**
  - Overall quality score per entity
  - Squad/team aggregated scores
  - Trend visualization (improving/declining)
  - Filterable by entity type, lifecycle, owner
- **Visual Components**
  - MUI X Charts (PieChart, BarChart) like HomePage
  - DataGrid table for detailed entity breakdown
  - Color-coded health indicators (success/warning/error)

**Technical Approach:**

```typescript
// Use Backstage Catalog API
import { useApi, catalogApiRef } from '@backstage/core-plugin-api';
import { useEntity } from '@backstage/plugin-catalog-react';

// Fetch all entities and calculate metrics
const catalogApi = useApi(catalogApiRef);
const { items } = await catalogApi.getEntities({
  filter: { kind: 'Component' },
});

// Score based on:
// - spec.owner exists
// - metadata.annotations['backstage.io/techdocs-ref'] exists
// - metadata.annotations['github.com/project-slug'] exists
```

**File Structure:**

```
packages/app/src/components/scorecard/
├── ScorecardPage.tsx          # Main page component
├── EntityScoreCard.tsx        # Individual entity score display
├── ScoreMetrics.tsx           # Aggregated metrics charts
└── index.ts                   # Export
```

---

### 2. Pulse Check Page (`/pulse-check`)

**Purpose:** Real-time system health monitoring and incident tracking

**Suggested Features:**

- **System Health Overview**
  - Service uptime/downtime visualization
  - API health checks (ping endpoints from entity annotations)
  - Infrastructure status indicators
- **Incident Management**
  - Recent incidents from PagerDuty/OpsGenie integration
  - Incident timeline and MTTR metrics
  - On-call rotation display
- **Deployment Health**
  - Recent deployment success/failure rate
  - Rollback frequency
  - Deployment frequency by team
- **External Integrations**
  - Grafana embeds for key metrics
  - Datadog/New Relic synthetic monitors
  - GitHub Actions workflow status

**Technical Approach:**

```typescript
// Option 1: Backend health endpoint
const response = await fetch('/api/health');

// Option 2: Entity annotations for health checks
const entity = useEntity();
const healthUrl = entity.metadata.annotations?.['health-check-url'];

// Option 3: Backstage plugin
import { useHealthCheck } from '@backstage/plugin-health';
```

**Potential Backend Plugin:**
Create `@internal/backstage-plugin-pulse-check-backend` to:

- Poll health endpoints periodically
- Store historical health data
- Provide aggregated health API

**File Structure:**

```
packages/app/src/components/pulse-check/
├── PulseCheckPage.tsx         # Main page
├── SystemHealthCard.tsx       # Service health status
├── IncidentTimeline.tsx       # Recent incidents
├── DeploymentMetrics.tsx      # Deployment health
└── index.ts
```

---

### 3. Explore Page (`/explore`)

**Purpose:** Discover internal tools, plugins, and developer resources

**Suggested Features:**

- **Tool Directory**
  - Categorized cards (Monitoring, CI/CD, Documentation, etc.)
  - Quick links to external tools (Grafana, Slack, Confluence)
  - Integration status (connected/not connected)
- **Backstage Plugins Discovery**
  - Installed plugins showcase
  - Available community plugins
  - Plugin usage metrics
- **Learning Resources**
  - Getting started guides
  - Architecture documentation
  - Team runbooks and playbooks
- **API Registry**
  - Browse available internal APIs
  - Integration examples
  - Rate limits and authentication info

**Visual Design:**

- Grid layout with categorized cards (like marketplace)
- Search and filter by category, tags
- Card actions: "Visit", "Learn More", "Copy Code"

**Technical Approach:**

```typescript
// Static configuration or dynamic from backend
const tools = [
  {
    name: 'Grafana',
    category: 'Monitoring',
    description: 'Metrics and observability',
    url: 'https://grafana.example.com',
    icon: <GrafanaIcon />,
    status: 'connected',
  },
  // ... more tools
];

// Or fetch from backend API
const response = await fetch('/api/tools/discover');
```

**File Structure:**

```
packages/app/src/components/explore/
├── ExplorePage.tsx            # Main page
├── ToolCard.tsx               # Individual tool display
├── ToolGrid.tsx               # Grid layout container
├── CategoryFilter.tsx         # Filter by category
├── toolsConfig.ts             # Tool definitions
└── index.ts
```

---

### 4. HomePage - Connect Live Data

**Current State:** Uses hardcoded mock data in HomePage.tsx

**Integration Points:**

**A. Entity Counts (Services, APIs, Components)**

```typescript
import { useApi, catalogApiRef } from '@backstage/core-plugin-api';

const catalogApi = useApi(catalogApiRef);

// Fetch service count
const services = await catalogApi.getEntities({
  filter: { kind: 'Component', 'spec.type': 'service' },
});
const serviceCount = services.items.length;

// Fetch by owner
const ownedServices = await catalogApi.getEntities({
  filter: {
    kind: 'Component',
    'spec.owner': 'group:default/backend-team',
  },
});
```

**B. Service Health Data**

- Option 1: Fetch from custom backend endpoint
- Option 2: Aggregate from entity annotations
- Option 3: Integrate with monitoring system (Prometheus/Grafana)

**C. Cost Data**

- Integrate with cloud cost APIs (AWS Cost Explorer, GCP Billing)
- Aggregate from entity annotations (`cost-center`, `monthly-cost`)
- Use cost management tools (Infracost, CloudHealth)

**D. Deployment Metrics**

- GitHub Actions API for workflow runs
- Backstage's built-in deployment tracking
- CD tool integration (ArgoCD, Flux, Spinnaker)

**E. Incident Data**

- PagerDuty API integration
- OpsGenie API
- Custom incident tracking backend

**Changes Required:**

```typescript
// Replace mock data sections in HomePage.tsx

// Before (mock):
const serviceCount = 43;

// After (live):
const catalogApi = useApi(catalogApiRef);
const [serviceCount, setServiceCount] = useState(0);

useEffect(() => {
  catalogApi
    .getEntities({
      filter: { kind: 'Component', 'spec.type': 'service' },
    })
    .then(response => setServiceCount(response.items.length));
}, [catalogApi]);
```

---

### 5. CI/CD Tab Implementation

**Current State:** Placeholder message in EntityPage.tsx service tabs

**Integration Options:**

**A. GitHub Actions** (Recommended if using GitHub)

```bash
# Install plugin
yarn workspace app add @backstage/plugin-github-actions

# Add to entity page
import { EntityGithubActionsContent } from '@backstage/plugin-github-actions';

<EntityLayout.Route path="/ci-cd" title="CI/CD">
  <EntityGithubActionsContent />
</EntityLayout.Route>
```

**B. GitLab CI**

```bash
yarn workspace app add @backstage/plugin-gitlab
```

**C. Jenkins**

```bash
yarn workspace app add @backstage/plugin-jenkins
```

**D. Custom CI/CD Display**
Create custom component to show:

- Recent pipeline runs
- Success/failure rate
- Build duration trends
- Deployment history

**Configuration Required:**

```yaml
# app-config.yaml
integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}
```

**Entity Annotation:**

```yaml
# catalog-info.yaml
metadata:
  annotations:
    github.com/project-slug: echohello-dev/backstage
```

---

## Technical Patterns to Follow

### Component Structure (Based on HomePage.tsx)

```typescript
import { Page } from '@backstage/core-components';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

export const YourPage = () => {
  const theme = useTheme();

  return (
    <Page themeId="tool">
      <Box sx={{ padding: '2rem' }}>{/* Your content */}</Box>
    </Page>
  );
};
```

### Styling Conventions

- Use `styled()` from `@mui/material/styles` for custom components
- Use `sx` prop for inline styles
- Follow MUI v5 patterns (not v4)
- Use theme variables: `theme.palette.*`, `theme.spacing()*`

### Icons

- Primer Octicons from `@primer/octicons-react` for navigation
- MUI Icons from `@mui/icons-material` for content
- Custom SVG icons in `packages/app/src/components/icons/`

### API Usage

```typescript
import { useApi, catalogApiRef } from '@backstage/core-plugin-api';

const MyComponent = () => {
  const catalogApi = useApi(catalogApiRef);
  const [data, setData] = useState([]);

  useEffect(() => {
    catalogApi.getEntities().then(response => {
      setData(response.items);
    });
  }, [catalogApi]);

  return <div>{/* Render data */}</div>;
};
```

### Route Registration (App.tsx)

```typescript
import { ScorecardPage } from './components/scorecard';
import { PulseCheckPage } from './components/pulse-check';
import { ExplorePage } from './components/explore';

// Add inside <FlatRoutes>
<Route path="/scorecard" element={<ScorecardPage />} />
<Route path="/pulse-check" element={<PulseCheckPage />} />
<Route path="/explore" element={<ExplorePage />} />
```

---

## Dependencies to Consider

### Existing (Already Installed)

- `@mui/material` - UI components
- `@mui/x-charts` - Charts (PieChart, LineChart, BarChart)
- `@backstage/core-components` - Page, Link, etc.
- `@backstage/plugin-catalog-react` - Catalog hooks
- `@primer/octicons-react` - Icons

### Potentially Needed

```bash
# For CI/CD integration
yarn workspace app add @backstage/plugin-github-actions

# For advanced tables
yarn workspace app add @mui/x-data-grid

# For date handling
yarn workspace app add date-fns

# For API mocking during development
yarn workspace app add @backstage/plugin-api-docs
```

---

## Backend Plugins to Create (Optional)

### 1. Pulse Check Backend

```typescript
// plugins/pulse-check-backend/src/plugin.ts
export const pulseCheckPlugin = createBackendPlugin({
  pluginId: 'pulse-check',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        config: coreServices.rootConfig,
      },
      async init({ httpRouter, config }) {
        const router = Router();

        router.get('/health', async (req, res) => {
          // Poll entity health endpoints
          // Return aggregated status
        });

        httpRouter.use(router);
      },
    });
  },
});
```

### 2. Scorecard Backend

Store calculated scores and historical trends in database

---

## Configuration Updates Needed

### app-config.yaml

```yaml
# Add GitHub integration for CI/CD
integrations:
  github:
    - host: github.com
      token: ${GITHUB_TOKEN}

# Add custom backend endpoints
backend:
  baseUrl: http://localhost:7007

# Optional: External tool links
explore:
  tools:
    - name: Grafana
      url: https://grafana.example.com
      category: Monitoring
    - name: Slack
      url: https://example.slack.com
      category: Communication
```

---

## Development Command

To start the dev server: `mise run dev` (frontend on localhost:3000, backend on localhost:7007)

---

## Next Steps

1. **Phase 1: Basic Pages**

   - Implement Scorecard with Catalog API integration
   - Implement Explore with static tool configuration
   - Implement Pulse Check with mock data initially

2. **Phase 2: Live Data**

   - Connect HomePage to Catalog API
   - Add backend health endpoint for Pulse Check
   - Integrate cost data source

3. **Phase 3: CI/CD Integration**

   - Install GitHub Actions plugin
   - Configure entity annotations
   - Replace CI/CD tab placeholder

4. **Phase 4: Polish**
   - Add loading states and error handling
   - Implement responsive design
   - Add filtering and search capabilities
   - Write tests
