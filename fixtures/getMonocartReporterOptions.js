import path from "path";

function getCodeCoverageOptions(codeCoverageDir) {
  const v8RelativeFilePath = "v8/index.html";

  // The paths in the codeCoverageReports variable are all relative to monocart-reporter coverage.outputDir.
  //
  // Note that you can configure the reports to produce just an lcov or cobertura report for instance.
  // No need to produce html report like the html-spa or v8 reports if the only thing you want is an lcov
  // report to upload to sonarQ.
  // However, I do recommend always having an html report so a human can look at it. Even if you only generate
  // it outside your CI environment, just for local dev purposes.
  const _codeCoverageReports = [
    [
      "html",
      {
        subdir: "istanbul",
      },
    ],
    [
      "console-summary",
      {
        metrics: ["lines"],
      },
    ],
    [
      "lcovonly",
      {
        file: "lcov/lcov.info",
      },
    ],
    [
      "raw",
      {
        outputDir: "raw",
      },
    ],
  ];

  // for documentation on the monocart code coverage options see:
  // - https://github.com/cenfun/monocart-reporter#code-coverage-report
  // - https://github.com/cenfun/monocart-coverage-reports
  // - https://github.com/cenfun/monocart-coverage-reports/blob/main/lib/index.d.ts
  const coverageOptions = {
    outputDir: codeCoverageDir, // all code coverage reports will be created in this dir.
    reportPath: path.resolve(codeCoverageDir, v8RelativeFilePath), // code coverage html report filepath which shows up in the monocart report under global attachments.
    reports: _codeCoverageReports,
    entryFilter: (entry) => {
      // console.log("pop", entry);
      // Exclude files that aren't excluded by sourceFilter because they
      // are not included in the sourcemap.See:
      // - https://github.com/cenfun/monocart-reporter/issues/60
      //
      // Configure this filter accordingly to your app, you might not
      // even need it if sourceFilter is enough.
      const url = entry.url;
      return (
        !url.includes(".npm") &&
        !url.includes("@fs") &&
        !url.includes("maps.googleapis.com") &&
        !url.includes("fonts.googleapis.com") &&
        url !== "http://127.0.0.1:3002/index.css"
      );
    },
    sourceFilter: (sourcePath) => {
      // Only include files that are under the src folder.
      // Configure this filter accordingly to your app.
      if (sourcePath && sourcePath.startsWith(".npm")) {
        return false;
      }
      //console.log(sourcePath.search(/src\//u) !== -1, sourcePath);
      return sourcePath.search(/src\//u) !== -1;
    },
  };
  return coverageOptions;
}

export function getMonocartReporterOptions(testResultsDir, codeCoverageDir) {
  const monocartOptions = {
    name: "coverage",
    outputFile: path.resolve(testResultsDir, "monocart-report.html"),
    coverage: getCodeCoverageOptions(codeCoverageDir),
  };
  return monocartOptions;
}
