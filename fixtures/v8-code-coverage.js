import { BrowserType, Page, test } from "@playwright/test";
import { addCoverageReport, attachCoverageReport } from "monocart-reporter";

// export type collectV8CodeCoverageOptions = {
//   browserType: BrowserType,
//   page: Page,
//   use: (autoTestFixture: string) => Promise<void>,
//   enableJsCoverage: boolean,
//   enableCssCoverage: boolean,
// };

function browserSupportsV8CodeCoverage(browserType) {
  return browserType.name() === "chromium";
}

// See https://playwright.dev/docs/api/class-coverage.
// This instruments code using v8 and then attaches the code coverage data
// to the monocart-reporter.
export async function collectV8CodeCoverageAsync(options) {
  // prettier-ignore
  const v8CodeCoverageSupported = browserSupportsV8CodeCoverage(options.browserType);
  // prettier-ignore
  const codeCoverageEnabled = options.enableJsCoverage || options.enableCssCoverage;
  if (!v8CodeCoverageSupported || !codeCoverageEnabled) {
    await options.use("autoTestFixture");
    return;
  }

  const page = options.page;
  let startCoveragePromises = [];
  // When collecting code coverage make sure the 'resetOnNavigation' is set to false.
  // Otherwise, if the test contains page navigations then only the coverage for the
  // last page navigation is recorded.
  if (options.enableJsCoverage) {
    const startJsCoveragePromise = page.coverage.startJSCoverage({
      resetOnNavigation: false,
    });
    startCoveragePromises.push(startJsCoveragePromise);
  }
  if (options.enableCssCoverage) {
    const startCssCoveragePromise = page.coverage.startCSSCoverage({
      resetOnNavigation: false,
    });
    startCoveragePromises.push(startCssCoveragePromise);
  }

  await Promise.all(startCoveragePromises);
  await options.use("autoTestFixture");

  let stopCoveragePromises = [];
  if (options.enableJsCoverage) {
    const stopJsCoveragePromise = await page.coverage.stopJSCoverage();
    // console.log(
    //   "ok sir",
    //   stopJsCoveragePromise.filter((i) => !i.url.includes("https"))
    // );
    const dt = stopJsCoveragePromise.filter((i) => {
      return !i.url.includes("https") && i.url.includes(".js");
    });
    // console.log('ok sir', dt);

    //    }://127.0.0.1:3002/index.js'
    // @ts-ignore
    stopCoveragePromises.push(dt);
  }
  if (options.enableCssCoverage) {
    const stopCssCoveragePromise = page.coverage.stopCSSCoverage();
    stopCoveragePromises.push(stopCssCoveragePromise);
  }
  const coverageReports = await Promise.all(stopCoveragePromises);
  ///console.log(coverageReports.flat(), 'Line 63 ==> ');
  // const report = await attachCoverageReport(coverageReports, test.info());
  // console.log("221", report.summary);
  await addCoverageReport(coverageReports.flat(), test.info());
}
