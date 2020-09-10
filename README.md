SETUP:
- for Windows : if not present, install nodejs from https://nodejs.org/en/download/
	- run the tests
	
- for Ubuntu : if not present, install nodejs from https://nodejs.org/en/download/ or :
		- sudo apt update
		- sudo apt install nodejs
		- nodejs -v (to check the installation was ok)
	- also for Ubuntu users delete package-lock.json and node_modules from the project
	- run: npm i @babel/cli @babel/core @babel/preset-env @babel/register @rpii/wdio-html-reporter @wdio/cli @wdio/local-runner @wdio/mocha-framework @wdio/spec-reporter @wdio/sync chai chromedriver prettier wdio-chromedriver-service --save-dev
	- run the tests
	
INFO:
This is a WebdriverIO based framework, with babel as javascript compiler (more info about babel at https://babeljs.io/docs/en/index.html)

Tests will run by using "npm run test" or "npx wdio wdio.conf.js" commands

Tests can be found in tests/challengeTests.js

All the functions used by tests can be found in utils/helperFunctions

All framework configurations are in wdio.conf.js

For running in headless or not mode you need to go wdio.conf.js -> capabilities
and add or remove the "--headless" arg of chromeOptions

Reports are being generated in:

- HTML format: reports/html-reports/suite-0-0/report.html
- JSON format: reports/html-reports/suite-0-0/report.JSON
- screenshots made at the end of the tests are in reports/html-reports/screenshots

Reports configuration can be found in wdio.conf.js -> reporters

All the WebdriverIO documentation can be found at https://webdriver.io/

