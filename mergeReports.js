// esm syntax
// import fs from 'fs';
// import { CoverageReport } from 'monocart-coverage-reports';
const EC = require('eight-colors');
const MCR = require('monocart-coverage-reports');
const coverageOptions = {
  name: 'My Merged Coverage Report',
  inputDir: ['./coverage-results/raw', ./testresults/ct/raw'],
  outputDir: './coverage-reports/merged',
  reports: [['v8'], ['console-summary']],
  // onEnd: () => {
  //   // remove the raw files if it useless
  //   fs.rmSync('./coverage-reports/unit/raw', {
  //     recursive: true,
  //     force: true,
  //   });
  // },
};

const generate = async () => {
  // clean cache first
  await MCR(coverageOptions).cleanCache();
  console.log('generate merge coverage reports ...');
  const coverageResults = await MCR(coverageOptions).generate();
  console.log('merge coverage reportPath', EC.magenta(coverageResults.reportPath));
};
generate();
// console.log('dds');
// await new MCR(coverageOptions).generate();
