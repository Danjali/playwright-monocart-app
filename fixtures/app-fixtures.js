import { test as baseTest } from "@playwright/test";
import { collectV8CodeCoverageAsync } from "./v8-code-coverage";
const HomePage = require("../e2e-tests/App.spec");

// re-exporting the default expect as well so that on the tests we can have
// a single import for expect and test, but the test will be the extended test below
export { expect } from "@playwright/test";

// Export the extended test type.
// All tests that use this export 'test' type will have the automatic fixture applied to them.
export const test = baseTest.extend({
  codeCoverageAutoTestFixture: [
    async ({ browser, page }, use) => {
      const options = {
        browserType: browser.browserType(),
        page: page,
        use: use,
        enableJsCoverage: true,
        enableCssCoverage: true,
      };
      await collectV8CodeCoverageAsync(options);
    },
    {
      scope: "test",
      auto: true,
    },
  ],
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
