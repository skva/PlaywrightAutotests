# TypeScript + Playwright + Allure Automation Tests

### Project Description

This is a test automation project utilizing the power of the Playwright testing framework with TypeScript.

### Requirements

Before you begin, ensure you have met the following requirements:

You have installed the latest version of [Node.js and npm](https://nodejs.org/en/download/). To confirm that Node.js and npm are installed, you can run the following commands in your terminal:`node --version` `npm --version`
  If these commands show version numbers, then the installations were successful.

### Installation
*  Execute `npm install`.

### Run automation tests locally
*  Execute all tests: `npx playwright test`.
*  Execute all UI tests: `npx playwright test ui`.
*  Execute all API tests: `npx playwright test api`.

### Additional information
Tests execute only in Chrome Browser. Edit `playwright.config.ts` to enable another browsers.

### Next Improvements
* Refactor util functions and convert to classes
* Add browser util
* Improve some locators
* Move isbns to fixtures