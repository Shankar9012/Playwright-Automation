# CoverGo
This repository contains automated UI and API tests for different modules including:

Book API

Form Table

Form Fill-up

The tests are implemented using Playwright and follow best practices for maintainability and scalability.

Prerequisites
Node.js (version 20 or above recommended)

git clone https://github.com/Shankar9012/AutomationFramework.git

Running Tests

Run all tests
To execute all tests (book API, form table, and form fill-up):
npx playwright test
Run tests in headed mode (with browser UI)

npx playwright test --headed
Run tests for a specific file or folder
For example, to run only Book API tests:

npx playwright test tests/bookApi/

npx playwright test tests/formFillup/formFillup.spec.ts
View HTML Test Report
After running tests, generate and open the HTML report:

npx playwright show-report



