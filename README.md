# jest-playwright-monocart-app

Merge coverage reports from jest and playwright using monocart-reporter.

Firstly, run  `npm run test` to run the jest unit test cases and to generate the code coverage in `jest-coverage-results` folder.
Secondly, run  `npm run test:e2e` to run the playwright e2e test cases and to generate the code coverage in `playwright-coverage-results` folder.
Lastly, run `node meregReports.js` to merge the jest and playwright code coverage.

Note: I used Node version is v20.6.0



