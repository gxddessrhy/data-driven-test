const { test, expect } = require('@playwright/test');
const testCases = require('./testCases.json');

test.describe('Data Driven Tests', () => {

  for (const data of testCases) {

    test(data.name, async ({ page }) => {

      await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

      // WAIT for page to fully load
      await page.waitForTimeout(3000);

      // SAFE LOGIN (NO OLD SELECTORS)
      const inputs = page.locator('input');
      await inputs.first().fill('admin');
      await inputs.nth(1).fill('password123');

      await page.locator('button').first().click();

      await page.waitForTimeout(2000);

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
