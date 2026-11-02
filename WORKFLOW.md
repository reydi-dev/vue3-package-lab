# Package onboarding and release workflow

| Package | Version | Scenario directory | Source |
| --- | --- | --- | --- |
| `@reydi-dev/vue3-smart-datatable` | `0.1.0-beta.1` | `src/packages/smart-datatable/` | [repository](https://github.com/reydi-dev/vue3-smart-datatable) |

For a new package or version, install the exact npm version in the lab, keep its scenarios in an isolated directory, add/update its registry entry and lockfile, and run the consumer checks. Record version, environment, commands, behavior, failures and limitations in TEST_REPORT.md. Fix package defects in the package's own repository and retest a new candidate; never patch installed dependencies or import package source through aliases.

Before a release, a candidate tarball can be tested in an isolated copy of the lab without committing a `file:` dependency. Record its integrity and restore the clean npm lockfile install afterwards. Publishing npm packages and public deployments are separate release actions controlled by their own project approvals.

The mock API is Vite middleware, running only in dev/preview. Static hosting needs a different transport or backend. Never put real customer data, secrets, credentials or OTPs in fixtures or commits.
