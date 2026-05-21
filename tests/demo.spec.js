const { test, expect } = require('@playwright/test');
const testCases = require('./testCases.json');

test.describe('Data Driven Tests', () => {

  for (const data of testCases) {

    test(data.name, async ({ page }) => {

      await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

      await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');

await page.getByRole('textbox').first().fill('admin');
await page.getByRole('textbox').last().fill('password123');

await page.getByRole('button', { name: /login|sign in/i }).click();

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
