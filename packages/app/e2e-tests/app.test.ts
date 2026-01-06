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

test.describe('App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const enterButton = page.getByRole('button', { name: 'Enter' });
    await expect(enterButton).toBeVisible();
    await enterButton.click();
  });

  test('should render the home page with dashboard', async ({ page }) => {
    // Wait for the home page to load with catalog data
    await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to scorecard page', async ({ page }) => {
    await page.goto('/scorecard');
    await expect(page.getByText('Entity Scorecards')).toBeVisible({
      timeout: 10000,
    });
  });

  test('should navigate to pulse check page', async ({ page }) => {
    await page.goto('/pulse-check');
    await expect(page.getByText('Pulse Check')).toBeVisible({ timeout: 10000 });
  });

  test('should navigate to explore page', async ({ page }) => {
    await page.goto('/explore');
    await expect(page.getByText('Explore Tools & Services')).toBeVisible({
      timeout: 10000,
    });
  });

  test('should navigate to catalog page', async ({ page }) => {
    await page.goto('/catalog');
    await expect(page.getByText('My Company Catalog')).toBeVisible({
      timeout: 10000,
    });
  });
});
