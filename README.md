# Vue 3 Package Lab

A private-to-npm, independent consumer workspace for testing published Vue 3 packages. The first package under test is [`@reydi-dev/vue3-smart-datatable@0.1.0-beta.1`](https://www.npmjs.com/package/@reydi-dev/vue3-smart-datatable); it is installed from npm without source aliases or workspace links. All customer data is synthetic.

## Run locally

Use Node from `.nvmrc` and npm:

```sh
npm ci
npm run build
npm run preview
```

Open http://127.0.0.1:4191/. For development use `npm run dev` at http://127.0.0.1:4190/. Both Vite servers provide the local mock API; a static deployment of `dist` alone does not provide it.

## First package workspace

- **Local data:** sorting, filtering, selection, persistence and CSV.
- **Async provider:** real fetch to `/api/customers` with synthetic data, filtering, paging, sorting and AbortSignal.
- **States:** loading, simulated failure, recovery/retry and empty results.
- **Slots & actions:** custom cell/action integration.
- **فارسی / RTL:** localized messages, responsive layout and light/dark theme.

The npm beta currently has both `next` and `latest` tags; the lab pins the exact beta version. See [package issue #27](https://github.com/reydi-dev/vue3-smart-datatable/issues/27).

## Checks

```sh
npm run build
npx playwright install chromium
npm run test:e2e
```

For an existing compatible browser, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. E2E starts a separate production preview on port 4192. The browser suite checks representative local/async/slot, error/retry/empty and mobile RTL behavior. See [TEST_REPORT.md](TEST_REPORT.md) for observed results and limitations.

## Add another Vue 3 package

1. Install the exact published npm version; commit the manifest and lockfile. Keep Vue a single shared runtime and do not alias the package to source.
2. Create a separate directory under `src/packages/` for that package's fixtures and scenarios.
3. Add its metadata and scenario components to `src/packages/registry.ts`. The sidebar renders the registry and switches packages without replacing existing examples.
4. Add relevant focused consumer checks and document the package version, scenarios and actual results. Use synthetic data and a local mock API where necessary.
5. Run a clean `npm ci`, build and relevant browser checks before reviewing changes.

The lab itself has `private: true` to prevent npm publication; its GitHub repository can be public. See [WORKFLOW.md](WORKFLOW.md) for package onboarding and release evidence.
