import { Route } from 'react-router-dom';
import { apiDocsPlugin, ApiExplorerPage } from '@backstage/plugin-api-docs';
import {
  CatalogEntityPage,
  CatalogIndexPage,
  catalogPlugin,
  CatalogTable,
} from '@backstage/plugin-catalog';
import {
  CatalogImportPage,
  catalogImportPlugin,
} from '@backstage/plugin-catalog-import';
import { ScaffolderPage, scaffolderPlugin } from '@backstage/plugin-scaffolder';
import { orgPlugin } from '@backstage/plugin-org';
import { SearchPage } from '@backstage/plugin-search';
import {
  TechDocsIndexPage,
  techdocsPlugin,
  TechDocsReaderPage,
} from '@backstage/plugin-techdocs';
import { TechDocsAddons } from '@backstage/plugin-techdocs-react';
import { ReportIssue } from '@backstage/plugin-techdocs-module-addons-contrib';
import { UserSettingsPage } from '@backstage/plugin-user-settings';
import { apis } from './apis';
import { entityPage } from './components/catalog/EntityPage';
import { searchPage } from './components/search/SearchPage';
import { Root } from './components/Root';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import {
  AlertDisplay,
  OAuthRequestDialog,
  SignInPage,
} from '@backstage/core-components';
import { createApp } from '@backstage/app-defaults';
import { AppRouter, FlatRoutes } from '@backstage/core-app-api';
import { CatalogGraphPage } from '@backstage/plugin-catalog-graph';
import { RequirePermission } from '@backstage/plugin-permission-react';
import { catalogEntityCreatePermission } from '@backstage/plugin-catalog-common/alpha';
import { NotificationsPage } from '@backstage/plugin-notifications';
import { SignalsDisplay } from '@backstage/plugin-signals';
import { UnifiedThemeProvider } from '@backstage/theme';
import { backstageTheme } from './theme';
import { HomePage } from './components/home/HomePage';
import CssBaseline from '@mui/material/CssBaseline';
import { PlausibleAnalytics } from '@internal/backstage-plugin-plausible';
import { githubAuthApiRef, gitlabAuthApiRef } from '@backstage/core-plugin-api';
import {
  brandDarkTheme,
  brandLightTheme,
} from '@internal/backstage-theme-github';
import { PrimerDemoPage } from './components/PrimerDemoPage';

const app = createApp({
  apis,
  bindRoutes({ bind }) {
    bind(catalogPlugin.externalRoutes, {
      createComponent: scaffolderPlugin.routes.root,
      viewTechDoc: techdocsPlugin.routes.docRoot,
      createFromTemplate: scaffolderPlugin.routes.selectedTemplate,
    });
    bind(apiDocsPlugin.externalRoutes, {
      registerApi: catalogImportPlugin.routes.importPage,
    });
    bind(scaffolderPlugin.externalRoutes, {
      registerComponent: catalogImportPlugin.routes.importPage,
      viewTechDoc: techdocsPlugin.routes.docRoot,
    });
    bind(orgPlugin.externalRoutes, {
      catalogIndex: catalogPlugin.routes.catalogIndex,
    });
  },
  components: {
    SignInPage: props => (
      <SignInPage
        {...props}
        auto
        providers={[
          'guest',
          {
            id: 'github-auth-provider',
            title: 'GitHub',
            message: 'Sign in using GitHub',
            apiRef: githubAuthApiRef,
          },
          {
            id: 'gitlab-auth-provider',
            title: 'GitLab',
            message: 'Sign in using GitLab',
            apiRef: gitlabAuthApiRef,
          },
        ]}
      />
    ),
  },
  themes: [
    {
      id: 'default',
      title: 'Default',
      variant: 'light',
      icon: <AcUnitIcon />,
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={backstageTheme}>
          <CssBaseline />
          {children}
        </UnifiedThemeProvider>
      ),
    },
    {
      id: 'brand-light',
      title: 'Brand Light',
      variant: 'light',
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={brandLightTheme}>
          <CssBaseline />
          {children}
        </UnifiedThemeProvider>
      ),
    },
    {
      id: 'brand-dark',
      title: 'Brand Dark',
      variant: 'dark',
      Provider: ({ children }) => (
        <UnifiedThemeProvider theme={brandDarkTheme}>
          <CssBaseline />
          {children}
        </UnifiedThemeProvider>
      ),
    },
  ],
});

const routes = (
  <FlatRoutes>
    <Route path="/" element={<HomePage />} />
    <Route path="/primer-demo" element={<PrimerDemoPage />} />
    <Route
      path="/catalog"
      element={
        <CatalogIndexPage
          columns={() => {
            return [
              CatalogTable.columns.createNameColumn(),
              CatalogTable.columns.createOwnerColumn(),
              CatalogTable.columns.createSpecTypeColumn(),
              CatalogTable.columns.createSpecLifecycleColumn(),
            ];
          }}
        />
      }
    />
    <Route
      path="/catalog/:namespace/:kind/:name"
      element={<CatalogEntityPage />}
    >
      {entityPage}
    </Route>
    <Route path="/docs" element={<TechDocsIndexPage />} />
    <Route
      path="/docs/:namespace/:kind/:name/*"
      element={<TechDocsReaderPage />}
    >
      <TechDocsAddons>
        <ReportIssue />
      </TechDocsAddons>
    </Route>
    <Route
      path="/self-service"
      element={
        <ScaffolderPage
          groups={[
            {
              title: 'Recommended',
              filter: entity =>
                entity?.metadata?.tags?.includes('recommended') ?? false,
            },
          ]}
        />
      }
    />
    <Route path="/api-docs" element={<ApiExplorerPage />} />
    <Route
      path="/catalog-import"
      element={
        <RequirePermission permission={catalogEntityCreatePermission}>
          <CatalogImportPage />
        </RequirePermission>
      }
    />
    <Route path="/search" element={<SearchPage />}>
      {searchPage}
    </Route>
    <Route path="/settings" element={<UserSettingsPage />} />
    <Route path="/catalog-graph" element={<CatalogGraphPage />} />
    <Route path="/notifications" element={<NotificationsPage />} />
  </FlatRoutes>
);

export default app.createRoot(
  <>
    <PlausibleAnalytics />
    <AlertDisplay />
    <OAuthRequestDialog />
    <SignalsDisplay />
    <AppRouter>
      <Root>{routes}</Root>
    </AppRouter>
  </>,
);
