# Registry design (deferred, not live)

This is a preserved design note, not build input. It is **not** wired into any build, CLI, or publish step.

## What this is

`registry-design.json` is the schema for a possible future shadcn/ui-style distribution model: a CLI (`npx elyui add button`) that copies raw component source directly into a consumer's project, rather than installing a compiled npm package. It was salvaged from an earlier, separate repo (`~/Documents/projects/elyui`, formerly pushed to `github.com/paulelyson/elyui`) that had started building this model before the two `elyui` repos were consolidated into this one.

The schema itself is sound: `path`/`target` file mappings per component, `registryDependencies` (e.g. `icon` depends on `models`), `npmDependencies`, and an `assets` array for setup steps a plain file copy can't do on its own (e.g. an `index-html-link` entry for the Material Symbols font `<link>` tag `icon` needs).

## Why it's deferred, not built

elyui ships as an npm library (Angular Package Format, via ng-packagr) instead. shadcn's copy-source model exists to solve *customization* — you get the raw file because you're expected to edit it. This library already solves that differently: CSS-variable theming (`--color-*`, `--padding-*`, etc.) plus per-component `hasBorder`/`hasRadius`/`variant` inputs give consumers real visual control without forking source.

For a single maintainer reusing this across multiple projects, copy-paste distribution means every project's copy drifts independently and every bugfix has to be manually re-applied N times. An npm package means fix once, `npm update` everywhere.

The registry's own on-disk contents are also a cautionary example of why: by the time it was found again, `button.ts`, `button.css`, `icon.css`, and `theme/global.css` had all gone completely stale (0 bytes / empty), because they were hand-copied snapshots that nobody kept in sync with the real components as they evolved.

## If this gets built later

Revisit only if the project goes open-source and people actually ask for copy-source distribution. If it does happen, the registry files must be **generated** from the library's actual source (`projects/elyui/src/lib/`) by a script — never hand-maintained duplicates — precisely to avoid repeating the staleness problem above.
