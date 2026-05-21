const { test, expect } = require('@playwright/test');
const testCases = require('./testCases.json');

test.describe('Data Driven Tests', () => {

  for (const data of testCases) {

    test(data.name, async ({ page }) => {

      await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

     await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

// wait for page to fully load (important)
await page.waitForLoadState('domcontentloaded');

// more flexible selectors (DO NOT use name attributes)
await page.locator('input').first().fill('admin');
await page.locator('input').nth(1).fill('password123');

// click first visible button (login/submit/sign in)
await page.locator('button:visible').first().click();
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
