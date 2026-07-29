# elyui

**Angular Material under the hood, dressed in a clean minimalist skin.**

An npm package nobody asked for. Built anyway.

---

## Why though

Angular Material is genuinely excellent at the parts that are actually hard. Accessibility. Keyboard navigation. Overlay positioning. Focus traps. `ControlValueAccessor` plumbing. You should not be rewriting any of that, and elyui doesn't — it's Material underneath.

The problem is everything else.

You wanted a text input. You got four module imports, a `<mat-form-field>` wrapper, and a template that's now long enough to need scrolling. Then you tried to change the color and discovered you're in Sass-land, learning a theming API, rebuilding to see a hex code change.

Your component file has become a scroll simulator and you still haven't written any actual features.

elyui keeps Material's brain and throws out its wardrobe.

## The pitch, in two diffs

### Snackbars

**Angular Material** — you have to author an entire component before you can show a single toast:

```ts
@Component({
  selector: 'app-my-snackbar',
  imports: [MatSnackBarModule, MatIconModule],
  template: `
    <div class="wrapper">
      <mat-icon>{{ data.icon }}</mat-icon>
      <span>{{ data.message }}</span>
      <button matIconButton (click)="ref.dismiss()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
  `,
})
export class MySnackbar {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    public ref: MatSnackBarRef<MySnackbar>,
  ) {}
}
```

...then wire it up at every call site:

```ts
this.snackBar.openFromComponent(MySnackbar, {
  data: { message: 'Saved.', icon: 'check' },
  panelClass: ['my-snackbar-success'],
  verticalPosition: 'top',
  duration: 10000,
});
```

...then write **global** CSS to undo Material's default padding, because the snackbar renders in a CDK overlay attached to `document.body`, outside your component's styles. (Ask how we know.)

**elyui:**

```ts
this.snackbar.openSnackbar({ type: 'success', message: ['Saved.'], icon: 'check' });
```

That's it. That's the whole thing.

### Theming

**Angular Material** — Sass, a theming API, and a rebuild:

```scss
@use '@angular/material' as mat;

html {
  @include mat.theme((
    color: (primary: mat.$violet-palette),
    typography: Roboto,
    density: 0,
  ));
}
```

**elyui** — it's just CSS variables. Change a value, save, done:

```css
:root {
  --color-bg-primary-idle: #d1fae5;
  --color-text-primary-default: #047857;
  --border-radius-md: 6px;
}
```

No Sass. No rebuild. No theming API to learn. If you can write a hex code, you can retheme the entire library.

---

## Install

```bash
npm install @paulelyson/elyui @angular/material @angular/cdk
```

`@angular/core`, `@angular/common`, `@angular/forms`, and `rxjs` are also peer dependencies, but you already have those in any Angular app.

Requires **Angular 21+**.

## Setup

**1. Import the theme.** Add it to your `angular.json` `styles` array (or `@import` it from your own global stylesheet). This defines every CSS variable the components render with — without it, components will render unstyled:

```json
"styles": [
  "node_modules/@paulelyson/elyui/styles/elyui.css",
  "src/styles.css"
]
```

**2. Load the Material Icons font.** `Icon` — and anything that renders one internally, which is most things — uses ligature icon names and expects this font in your `index.html`:

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
```

**3. Provide animations.** `Snackbar` needs them to enter and exit:

```ts
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    // ...your other providers
  ],
};
```

## Usage

Components are standalone — import the ones you use, no `NgModule`:

```ts
import { Component } from '@angular/core';
import { Button, Badge } from '@paulelyson/elyui';

@Component({
  selector: 'app-example',
  imports: [Button, Badge],
  template: `
    <ely-button appearance="filled" variant="primary" icon="save">Save</ely-button>
    <ely-badge variant="success">Active</ely-badge>
  `,
})
export class Example {}
```

Snackbar is opened imperatively through its service — no component to import, no template markup:

```ts
import { SnackbarService } from '@paulelyson/elyui';

export class Example {
  constructor(private snackbar: SnackbarService) {}

  save(): void {
    this.snackbar.openSnackbar({
      type: 'success',
      message: ['Saved successfully.'],
      icon: 'check',
    });
  }
}
```

## Theming

Every size- and color-dependent value is a CSS variable. Override any of them *after* importing `elyui.css`:

```css
:root {
  --color-bg-primary-idle: #d1fae5;
  --color-text-primary-default: #047857;
  --border-radius-md: 6px;
}
```

The token families:

| Family | Pattern | Example |
| --- | --- | --- |
| Font size | `--font-size-{xs,sm,md,lg}` | `--font-size-md: 14px` |
| Padding | `--padding-{xs,sm,md,lg}` | `--padding-md: 6px 10px` |
| Border radius | `--border-radius-{xs,sm,md,lg}` | `--border-radius-md: 12px` |
| Gap | `--gap-{xs,sm,md,lg}` | `--gap-md: 6px` |
| Text color | `--color-text-{variant}-default` | `--color-text-success-default` |
| Border color | `--color-border-{variant}-idle` | `--color-border-danger-idle` |
| Background | `--color-bg-{variant}-idle` | `--color-bg-accent-idle` |

`{variant}` is `primary`, `accent`, `success`, `warning`, or `danger` — plus `gray` (the neutral) for **border and background only**.

Text colors additionally expose three standalone tokens instead of a `gray` variant: `--color-text` (the default body color), `--color-text-white`, and `--color-text-gray-light`. There's also `--color-bg-primary-active` for the pressed state, and `--color-toggle-track-off` / `--color-toggle-thumb` for the `Toggle` switch.

The full token list is short and readable — worth skimming [`styles/elyui.css`](./styles/elyui.css) directly.

## Components

`Icon` · `Badge` · `Button` · `Toggle` · `Snackbar` (+ `SnackbarService`) · `SegmentedControl`

Most accept:

- **`size`** — `xs` | `sm` | `md` | `lg`
- **`variant`** — `neutral` | `primary` | `accent` | `success` | `warning` | `danger`
- **`hasBorder`** — `boolean`, for a seamless borderless look
- **`hasRadius`** — `boolean` on `Button` and `SegmentedControl`, for square corners

Nothing is forced on you. Don't want the focus glow? `[hasFocusGlow]="false"`. Don't want the border? `[hasBorder]="false"`. The library has opinions, not rules.

## Roadmap

Form controls are next, and they're where this gets properly satisfying. The autocomplete in the app this library was extracted from is **23 lines of template** plus ~150 lines of `FormControl` / `valueChanges` / `displayWith` / CVA wiring. The goal:

```html
<ely-autocomplete label="Equipment" [options]="options" (optionselected)="pick($event)" />
```

Not shipped yet — coming in a future release, alongside `input`, `textarea`, `dropdown`, `datepicker`, and `tab`.

## Status

Pre-1.0 (`0.1.0`). The API may still shift as more components land. Pin the version if that bothers you.

## License

MIT.
