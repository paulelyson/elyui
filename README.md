# elyui (workspace)

**A developer-friendly Angular Material.**

This is the **development workspace** — not the package. The publishable library lives in `projects/elyui/` and ships to npm as [`@paulelyson/elyui`](https://www.npmjs.com/package/@paulelyson/elyui). Everything else here (`src/`) is a demo app that consumes the library exactly like an external project would, and doubles as a living overview of every component.

> **Looking to actually *use* elyui?** You want [`projects/elyui/README.md`](projects/elyui/README.md), not this file.
>
> **Want to see it?** [Live demo](https://paulelyson.github.io/elyui/).

## The Goal

Angular Material is genuinely great at the hard parts — accessibility, keyboard handling, overlay positioning, form-control plumbing — and elyui keeps all of it. What it throws out is everything you *see*: the ripples, the elevated backgrounds, the heavy visual identity, and the small mountain of template markup you write to get a single styled input on screen.

Keep Material's brain. Lose its wardrobe.

### Principles

- **Minimalistic by default.** No ripple. No default backgrounds. No visual noise. Flat and clean.
- **Theme with CSS variables.** Override colors, spacing, and radii by editing CSS variables — no Sass, no Material theming API, no rebuild.
- **You control the focus glow.** It can be switched off per component. Opinions, not rules.
- **DX first: one line of HTML.** The verbosity lives inside the library, not in your templates.

## Workspace layout

```
elyui/
├── projects/elyui/     # THE LIBRARY — this is what gets published to npm
│   ├── src/lib/         components, models, services
│   ├── src/public-api.ts  the package's public exports
│   └── styles/elyui.css   the shipped theme (design tokens + snackbar override)
└── src/                 # THE DEMO APP — dev harness / component overview page,
                          # imports from 'elyui' just like an external consumer
```

## Status

Pre-1.0, live on npm. Components are migrated one at a time; the first set (Icon, Badge, Button, Toggle, Snackbar, SegmentedControl) is published. Form controls are next.

## Development

Requires Angular 21+.

```bash
npm install         # install workspace dependencies
npm start           # serve the demo app at http://localhost:4200
npm run build       # build the demo app
npm run build:demo  # build the demo for GitHub Pages (sets --base-href=/elyui/)
npm run build:lib   # build the library to dist/elyui (Angular Package Format)
npm run pack:lib    # build + npm pack the library into a local tarball
npm test            # run demo app unit tests (Vitest)
```

Publishing (`npm publish` from `dist/elyui`) is manual — never run automatically.

## Demo deployment

The demo app is published to GitHub Pages at **https://paulelyson.github.io/elyui/** by
[`.github/workflows/deploy-demo.yml`](.github/workflows/deploy-demo.yml), which runs on every push
to `main` (and on manual dispatch).

The demo builds straight from library *source* — the `elyui` path mapping in `tsconfig.json` points
at `projects/elyui/src/public-api.ts`, not `dist/` — so the deployed page always reflects the current
working tree, not the last published npm release.

**One-time setup:** in the repo's *Settings → Pages*, set **Source** to **GitHub Actions**. The
workflow can't do this for you, and deploys fail until it's set.
