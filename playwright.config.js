import { defineConfig, devices } from "@playwright/test";
import path from "path";
import EC from "eight-colors";
import { getMonocartReporterOptions } from "./fixtures/getMonocartReporterOptions";
// import { getMonocartReporterOptions } from "./fixtures/getMonocartReporterOptions";

const _testResultsDir = path.resolve("./testresults");
const _codeCoverageDir = path.resolve(_testResultsDir, "ct");

let coverageResults;

export default defineConfig({
  // Look for test files in the "tests" directory, relative to this configuration file.
  testDir: "./e2e-tests",
  outputDir: _testResultsDir,
  timeout: 120000,

  // Run all tests in parallel.
  fullyParallel: true,

  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,

  // Retry on CI only.
  retries: process.env.CI ? 2 : 0,

  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["html"],
    ["list"],
    [
      "monocart-reporter",
      getMonocartReporterOptions(_testResultsDir, _codeCoverageDir),
      // {
      //   name: "My e2e Test Report with coverage",
      //   outputFile: "./testresults/report.html",
      //   coverage: {
      //     onEnd: (_coverageResults) => {
      //       coverageResults = _coverageResults;
      //     },
      //   },
      //   onEnd: (reportData) => {
      //     if (coverageResults) {
      //       const { pct, status } = coverageResults.summary;
      //       let value = `${status} (${pct}%)`;
      //       if (status === "low") {
      //         value = EC.red(value);
      //       } else if (status === "medium") {
      //         value = EC.yellow(value);
      //       }
      //       reportData.summary.coverage = {
      //         name: "Coverage",
      //         value,
      //       };
      //     }
      //   },
      // },
    ],
  ],
  use: {
    // Base URL to use in actions like `await page.goto('/')`.
    baseURL: "http://127.0.0.1:3000",
    // Collect trace when retrying the failed test.
    trace: "on-first-retry",
    video: "on",
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Run your local dev server before starting the tests.
  webServer: {
    command: "npm run start",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
  },
});
