// esm syntax
const EC = require("eight-colors");
const MCR = require("monocart-coverage-reports");
const fs = require("fs");
const coverageOptions = {
  name: "Merged Coverage Report",
  inputDir: [
    "./jest-coverage-results/raw",
    "./playwright-coverage-results/ct/raw",
  ],
  sourceFilter: {
    "**/node_modules/**": false,
    "**/webpack/**": false,
    "**/*.css/**": false,
    "**/*.less/**": false,
    "**/*.less": false,
    "**/*.css": false,
    "**/*.svg": false,
    "**/*": true,
  },
  outputDir: "./merged-coverage-reports/merged",
  reports: [["v8"], ["console-summary"]],
  onEnd: () => {
    // remove the raw files if it useless
    fs.rmSync("./coverage-reports/rere", {
      recursive: true,
      force: true,
    });
  },
};

const generate = async () => {
  // clean cache first
  await MCR(coverageOptions).cleanCache();
  console.log("generate merge coverage reports ...");
  const coverageResults = await MCR(coverageOptions).generate();
  console.log(
    "merge coverage reportPath",
    EC.magenta(coverageResults.reportPath)
  );
};
generate();
