# elyui

A minimalist Angular component library — **Angular Material under the hood, dressed in clean custom CSS**.

Angular Material is powerful, but its defaults are opinionated (ripples, elevated backgrounds, heavy visual identity) and its usage is verbose. elyui keeps what Material does best — accessibility, keyboard handling, overlays, form-control plumbing — and replaces everything you *see* with a minimal, flat, easily themeable skin.

## Install

```bash
npm install @paulelyson/elyui @angular/material @angular/cdk
```

`@angular/core`, `@angular/common`, `@angular/forms`, and `rxjs` are also peer dependencies, but you already have them in any Angular app.

## Setup

**1. Import the theme.** Add it to your `angular.json` `styles` array (or `@import` it from your own global stylesheet) — it defines every CSS variable the components render with:

```json
"styles": ["node_modules/@paulelyson/elyui/styles/elyui.css", "src/styles.css"]
```

**2. Load the Material Icons font.** `Icon` (and anything that renders one internally) uses ligature icon names and expects this font to be available:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
```

**3. Provide animations.** `Snackbar` needs Angular's animations module to enter/exit:

```ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideAnimationsAsync(), /* ...your other providers */],
};
```

## Usage

```ts
import { Component } from '@angular/core';
import { Button, Badge } from '@paulelyson/elyui';

@Component({
  selector: 'app-example',
  imports: [Button, Badge],
  template: `
    <ely-button appearance="filled" variant="primary">Save</ely-button>
    <ely-badge variant="success">Active</ely-badge>
  `,
})
export class Example {}
```

Snackbar is opened imperatively via its service:

```ts
import { SnackbarService } from '@paulelyson/elyui';

constructor(private snackbar: SnackbarService) {}

save(): void {
  this.snackbar.openSnackbar({
    type: 'success',
    message: ['Saved successfully.'],
    icon: 'info',
  });
}
```

## Theming

Every size- and color-dependent value is a CSS variable. Override any of them after importing `elyui.css` to retheme the library — no rebuild, no Angular Material theming API:

```css
:root {
  --color-bg-primary-idle: #d1fae5;
  --color-text-primary-default: #047857;
  --border-radius-md: 6px;
}
```

## Components

`Icon`, `Badge`, `Button`, `Toggle`, `Snackbar` (+ `SnackbarService`), `SegmentedControl`.

Most components accept `size` (`xs`/`sm`/`md`/`lg`), `variant` (`neutral`/`primary`/`accent`/`success`/`warning`/`danger`), and, where a border applies, `hasBorder` — a boolean for a seamless/borderless look. `Button` and `SegmentedControl` also accept `hasRadius` for square corners.

## Status

Pre-1.0 (`0.1.0`). The API may still shift as more components are added.
