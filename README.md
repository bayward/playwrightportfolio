# Playwright Portfolio

End-to-end test automation portfolio built with [Playwright](https://playwright.dev/) and TypeScript.

## Structure

```
playwrightportfolio/
├── tests/                  # Test specs
│   └── homepage.spec.ts
├── pages/                  # Page Object Model classes
│   └── HomePage.ts
├── .github/workflows/      # CI pipeline
│   └── playwright.yml
├── playwright.config.ts    # Playwright configuration
├── tsconfig.json
└── package.json
```

## Getting started

```bash
# install dependencies
npm install

# install browser binaries
npx playwright install

# run all tests
npm test

# run tests in headed mode (see the browser)
npm run test:headed

# run tests with the interactive UI runner
npm run test:ui

# view the last HTML report
npm run report
```

## Configuration

- `playwright.config.ts` runs tests against **Chromium, Firefox, WebKit, and Mobile Chrome** by default.
- Set a `BASE_URL` environment variable to point tests at a different target, e.g.:

  ```bash
  BASE_URL=https://your-app.com npm test
  ```

## CI

Tests run automatically on every push and pull request to `main` via GitHub Actions (`.github/workflows/playwright.yml`), with the HTML report uploaded as a build artifact.

## Adding new tests

1. Add a Page Object under `pages/` if you're testing a new page/flow.
2. Add a spec file under `tests/` following the `*.spec.ts` naming convention.
3. Run `npm run codegen` to record interactions and generate selectors quickly.
