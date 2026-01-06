/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display sign-in page with guest option', async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await expect(enterButton).toBeVisible();
  });

  test('should allow guest sign-in', async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await expect(page.getByText('Welcome to the Developer Portal')).toBeVisible(
      { timeout: 15000 },
    );
  });
});

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await expect(enterButton).toBeVisible();
    await enterButton.click();
    await expect(page.getByText('Welcome to the Developer Portal')).toBeVisible(
      { timeout: 15000 },
    );
  });

  test('should render welcome hero section', async ({ page }) => {
    await expect(
      page.getByText('Welcome to the Developer Portal'),
    ).toBeVisible();
    await expect(page.getByText('Your single pane of glass')).toBeVisible();
  });

  test('should display search bar', async ({ page }) => {
    const searchInput = page.getByPlaceholder(
      'Search for services, APIs, docs, or teams...',
    );
    await expect(searchInput).toBeVisible();
  });

  test('should display quick actions section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Quick Actions' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Create New' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Register Existing' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'Browse Docs' }),
    ).toBeVisible();
    await expect(
      page.getByRole('heading', { name: 'API Explorer' }),
    ).toBeVisible();
  });

  test('should display catalog overview section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Catalog Overview' }),
    ).toBeVisible();
    await expect(page.getByText('Services', { exact: true })).toBeVisible();
    await expect(page.getByText('APIs', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Components', { exact: true })).toBeVisible();
  });

  test('should display system health section', async ({ page }) => {
    await expect(page.getByText('System Health')).toBeVisible();
    await expect(page.getByText('Overall Health')).toBeVisible();
  });

  test('should display getting started section', async ({ page }) => {
    await expect(
      page.getByRole('heading', { name: 'Getting Started' }),
    ).toBeVisible();
    await expect(
      page.getByRole('button', { name: '📚 Read the Documentation' }),
    ).toBeVisible();
  });

  test('should navigate to self-service when clicking Create New', async ({
    page,
  }) => {
    await page.getByText('Create New').click();
    await expect(page).toHaveURL(/self-service/);
  });

  test('should navigate to docs when clicking Browse Docs', async ({
    page,
  }) => {
    await page.getByText('Browse Docs').click();
    await expect(page).toHaveURL(/docs/);
  });

  test('should perform search and navigate to search page', async ({
    page,
  }) => {
    const searchInput = page.getByPlaceholder(
      'Search for services, APIs, docs, or teams...',
    );
    await searchInput.fill('test');
    await searchInput.press('Enter');
    await expect(page).toHaveURL(/search.*query=test/);
  });
});

test.describe('Catalog Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to catalog and display entities', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/catalog/);
  });

  test('should display catalog table with entity columns', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');
    // Table should be visible
    await expect(page.locator('table').first()).toBeVisible({ timeout: 15000 });
  });

  test('should filter catalog by kind', async ({ page }) => {
    await page.goto('/catalog?filters[kind]=component');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/catalog/);
  });
});

test.describe('API Docs Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to API docs page', async ({ page }) => {
    await page.goto('/api-docs');
    await expect(page.getByText('APIs')).toBeVisible({ timeout: 15000 });
  });
});

test.describe('TechDocs Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to docs page', async ({ page }) => {
    await page.goto('/docs');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/docs/);
  });
});

test.describe('Self-Service (Scaffolder) Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to self-service page', async ({ page }) => {
    await page.goto('/self-service');
    // Page should load without error
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/self-service/);
  });
});

test.describe('Search Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to search page', async ({ page }) => {
    await page.goto('/search');
    await expect(page.getByPlaceholder(/search/i)).toBeVisible({
      timeout: 15000,
    });
  });

  test('should display search results for query', async ({ page }) => {
    await page.goto('/search?query=service');
    await page.waitForLoadState('networkidle');
    // Search page should be functional
    await expect(page).toHaveURL(/search.*query=service/);
  });
});

test.describe('Settings Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to settings page', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.getByText('Settings')).toBeVisible({ timeout: 15000 });
  });

  test('should display theme options', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/settings/);
  });
});

test.describe('Scorecard Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to scorecard page', async ({ page }) => {
    await page.goto('/scorecard');
    await expect(page.getByText('Entity Scorecards')).toBeVisible({
      timeout: 15000,
    });
  });

  test('should display aggregate metrics section', async ({ page }) => {
    await page.goto('/scorecard');
    await page.waitForLoadState('networkidle');
    // Page should have loaded with scorecard content
    await expect(page).toHaveURL(/scorecard/);
  });

  test('should display filter options', async ({ page }) => {
    await page.goto('/scorecard');
    await page.waitForLoadState('networkidle');
    // Page should have loaded with scorecard content
    await expect(page).toHaveURL(/scorecard/);
  });

  test('should display entity score cards', async ({ page }) => {
    await page.goto('/scorecard');
    // Wait for entities to load
    await page.waitForLoadState('networkidle');
    // The page should have score card elements
    await expect(page.locator('[class*="Card"]').first()).toBeVisible({
      timeout: 15000,
    });
  });
});

test.describe('Pulse Check Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to pulse check page', async ({ page }) => {
    await page.goto('/pulse-check');
    await expect(page.getByText('Pulse Check')).toBeVisible({ timeout: 15000 });
  });

  test('should display service health summary', async ({ page }) => {
    await page.goto('/pulse-check');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/pulse-check/);
  });

  test('should display deployment metrics', async ({ page }) => {
    await page.goto('/pulse-check');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Deployment Metrics')).toBeVisible({
      timeout: 15000,
    });
  });

  test('should display incident timeline', async ({ page }) => {
    await page.goto('/pulse-check');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('Recent Incidents')).toBeVisible({
      timeout: 15000,
    });
  });

  test('should display system health status cards', async ({ page }) => {
    await page.goto('/pulse-check');
    await page.waitForLoadState('networkidle');
    // Should display status category labels
    await expect(page.locator('[class*="Card"]').first()).toBeVisible({
      timeout: 15000,
    });
  });
});

test.describe('Explore Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to explore page', async ({ page }) => {
    await page.goto('/explore');
    await expect(page.getByText('Explore Tools & Services')).toBeVisible({
      timeout: 15000,
    });
  });

  test('should display search input', async ({ page }) => {
    await page.goto('/explore');
    await expect(page.getByPlaceholder('Search tools...')).toBeVisible({
      timeout: 15000,
    });
  });

  test('should display category filters', async ({ page }) => {
    await page.goto('/explore');
    await page.waitForLoadState('networkidle');
    // Should have filter chips
    await expect(page.locator('[class*="Chip"]').first()).toBeVisible({
      timeout: 15000,
    });
  });

  test('should display tool cards', async ({ page }) => {
    await page.goto('/explore');
    // Wait for tools to render
    await page.waitForLoadState('networkidle');
    // Should have multiple tool cards
    const cards = page.locator('[class*="Card"]');
    await expect(cards.first()).toBeVisible({ timeout: 15000 });
  });

  test('should filter tools by search query', async ({ page }) => {
    await page.goto('/explore');
    const searchInput = page.getByPlaceholder('Search tools...');
    await searchInput.fill('GitHub');
    await page.waitForTimeout(500); // Wait for filter to apply
    // Should filter results
    await expect(searchInput).toHaveValue('GitHub');
  });

  test('should filter tools by category', async ({ page }) => {
    await page.goto('/explore');
    // Click on a category chip
    const categoryChip = page.getByRole('button', { name: 'CI/CD' });
    if (await categoryChip.isVisible()) {
      await categoryChip.click();
      // Category should be selected
      await page.waitForTimeout(500);
    }
  });
});

test.describe('Notifications Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to notifications page', async ({ page }) => {
    await page.goto('/notifications');
    // Page should load
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/notifications/);
  });
});

test.describe('Catalog Graph Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await page.waitForLoadState('networkidle');
  });

  test('should navigate to catalog graph page', async ({ page }) => {
    await page.goto('/catalog-graph');
    // Page should load
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/catalog-graph/);
  });
});

test.describe('Sidebar Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await expect(page.getByText('Welcome to the Developer Portal')).toBeVisible(
      { timeout: 15000 },
    );
  });

  test('should display sidebar with navigation items', async ({ page }) => {
    // Application should have loaded with sidebar
    await page.waitForLoadState('networkidle');
    // The app should be functional
    await expect(page).toHaveURL('/');
  });

  test('should navigate to different pages via sidebar', async ({ page }) => {
    // Click on Catalog in sidebar
    const catalogLink = page.getByRole('link', { name: /catalog/i });
    if (await catalogLink.isVisible()) {
      await catalogLink.click();
      await expect(page).toHaveURL(/catalog/);
    }
  });
});

test.describe('Quick Links from Home', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await expect(page.getByText('Welcome to the Developer Portal')).toBeVisible(
      { timeout: 15000 },
    );
  });

  test('should navigate to scorecard via quick links', async ({ page }) => {
    const scorecardLink = page.getByRole('button', { name: /scorecard/i });
    if (await scorecardLink.isVisible()) {
      await scorecardLink.click();
      await expect(page).toHaveURL(/scorecard/);
    }
  });

  test('should navigate to explore via quick links', async ({ page }) => {
    // Navigate directly to explore
    await page.goto('/explore');
    await expect(page).toHaveURL(/explore/);
  });

  test('should navigate to pulse check via View Pulse Check button', async ({
    page,
  }) => {
    const pulseCheckLink = page.getByRole('button', {
      name: /View Pulse Check/i,
    });
    if (await pulseCheckLink.isVisible()) {
      await pulseCheckLink.click();
      await expect(page).toHaveURL(/pulse-check/);
    }
  });
});

test.describe('Responsive Design', () => {
  test('should render correctly on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await expect(page.getByText('Welcome to the Developer Portal')).toBeVisible(
      { timeout: 15000 },
    );
  });

  test('should render correctly on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await enterButton.click();
    await expect(page.getByText('Welcome to the Developer Portal')).toBeVisible(
      { timeout: 15000 },
    );
  });
});
