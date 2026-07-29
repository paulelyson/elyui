# elyui (workspace)

This is the **development workspace** for [elyui](projects/elyui/README.md) — not the published package itself. The publishable library lives in `projects/elyui/`; everything else here (`src/`) is a demo app that consumes the library exactly like an external project would, and doubles as a living overview of every component.

If you're looking to *use* elyui in your own project, see [`projects/elyui/README.md`](projects/elyui/README.md) instead.

## The Goal

Angular Material is powerful, but its defaults are opinionated (ripples, elevated backgrounds, heavy visual identity) and its usage is verbose. elyui keeps what Material does best — accessibility, keyboard handling, overlays, form-control plumbing — and replaces everything you *see* with a minimal, flat, easily themeable skin.

### Principles

- **Minimalistic by default.** No ripple. No default backgrounds. No visual noise. Just clean, flat components.
- **Theme with CSS variables.** Override colors, spacing, and radii by updating CSS variables — no Material theming API, no rebuild.
- **You control the focus glow.** The focus ring/glow can be disabled per component — it's your call, not the library's.
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

Pre-1.0 (`0.1.0`). Components are being built out one at a time; a first set (Icon, Badge, Button, Toggle, Snackbar, SegmentedControl) is published.

## Development

Requires Angular 21+.

```bash
npm install         # install workspace dependencies
npm start           # serve the demo app at http://localhost:4200
npm run build       # build the demo app
npm run build:lib   # build the library to dist/elyui (Angular Package Format)
npm run pack:lib    # build + npm pack the library into a local tarball
npm test            # run demo app unit tests (Vitest)
```

Publishing (`npm publish` from `dist/elyui`) is manual — never run automatically.
