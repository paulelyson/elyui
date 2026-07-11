# elyui

A minimalist Angular component library — **Angular Material under the hood, dressed in clean custom CSS**.

## The Goal

Angular Material is powerful, but its defaults are opinionated (ripples, elevated backgrounds, heavy visual identity) and its usage is verbose. elyui keeps what Material does best — accessibility, keyboard handling, overlays, form-control plumbing — and replaces everything you *see* with a minimal, flat, easily themeable skin.

### Principles

- **Minimalistic by default.** No ripple. No default backgrounds. No visual noise. Just clean, flat components.
- **Theme with CSS variables.** Override primary, accent, and semantic colors by updating CSS variables — no Material theming API, no rebuild:

  ```css
  :root {
    --color-primary-500: #6d28d9;
    --color-accent-500: #f59e0b;
  }
  ```

- **You control the focus glow.** The focus ring/glow can be disabled per component — it's your call, not the library's.
- **DX first: one line of HTML.** The verbosity lives inside the library, not in your templates.

  ```html
  <!-- elyui -->
  <app-autocomplete [options]="options" />
  ```

  versus the raw Material equivalent: a `mat-form-field`, a `mat-label`, an `input` with `matAutocomplete`, a `mat-autocomplete` panel, a `@for` of `mat-option`s, plus the filtering pipeline in your component class — every single time.

## Status

The library is being populated by migrating components from an existing production Angular app, one component at a time. Components arrive as-is first; refinement toward the principles above comes after.

## Development

Requires Angular 21+.

```bash
npm install     # install dependencies
ng serve        # dev server at http://localhost:4200
ng build        # build to dist/
ng test         # unit tests (Vitest)
```
