# Consumer test report

## 2026-11-03 — smart-datatable 0.1.0-beta.1

- Installed the published scoped npm package at the exact version with a lockfile; verified the installed package is not a symlink and Vue 3.5.44 is deduplicated.
- `npm run build`: passed strict Vue/TypeScript typecheck and Vite production build.
- `npm run test:e2e`: two Chromium flows passed against an isolated production preview and local mock API. They cover local selection, column visibility persistence after reload, CSV download filename, server filtering through real fetch, custom action, simulated error/recovery/retry and empty state, plus 375px Persian RTL/dark mode.
- Local browser: existing Chromium 140.0.7339.16 on macOS 13 through `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. CI installs matching Playwright Chromium on Ubuntu.
- The first empty-state assertion expected the wrong text; it was corrected to the actual library message. This was a test expectation issue, not a reported package defect.
- The npm `latest` tag currently also points to this prerelease; package issue [#27](https://github.com/reydi-dev/vue3-smart-datatable/issues/27) tracks it.
- These are focused checks, not a cross-browser, screen-reader or Nuxt audit. The CSV check verifies a download and filename, not full file contents. The package's own independent consumer checks provide additional coverage.
