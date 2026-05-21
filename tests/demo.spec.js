const { test, expect } = require('@playwright/test');
const testCases = require('./testCases.json');

test.describe('Data Driven Tests', () => {

  for (const data of testCases) {

    test(data.name, async ({ page }) => {

      await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

      // IMPORTANT: wait for page to fully render
      await page.waitForLoadState('networkidle');

      // wait for inputs to exist BEFORE interacting
      const inputs = page.locator('input');
      await inputs.first().waitFor({ state: 'visible' });

      // login (safe version)
      await inputs.first().fill('admin');
      await inputs.nth(1).fill('password123');

      await page.locator('button').first().click();

      // wait for app to load after login
      await page.waitForTimeout(2000);

      // navigation + checks
      await page.click(`text=${data.board}`);

      const column = page.locator(`text=${data.column}`).locator('..');
      await expect(column).toContainText(data.task);

      const taskCard = page.locator(`text=${data.task}`).locator('..');

      for (const tag of data.tags) {
        await expect(taskCard).toContainText(tag);
      }

    });

  }

});
