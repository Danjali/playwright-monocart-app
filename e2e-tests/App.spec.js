import { test } from "../fixtures/app-fixtures";

const { expect } = require("@playwright/test");

// const { test, expect } = require('../../baseFixtures');
test("Home page", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.waitForTimeout(3000);
  await expect(page).toHaveTitle("React App");
});
