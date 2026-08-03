# elyui

**Angular Material under the hood, dressed in a clean minimalist skin.**

An npm package nobody asked for. Built anyway.

---

## Why though

Angular Material is genuinely excellent at the parts that are actually hard. Accessibility. Keyboard navigation. Overlay positioning. Focus traps. `ControlValueAccessor` plumbing. You should not be rewriting any of that, and elyui doesn't — it's Material underneath.

The problem is everything else.

You wanted a small green button. You got two module imports, a nested `<mat-icon>`, and a stylesheet where you're overriding `--mdc-` custom properties because Material's palette has `primary` and `error` but no idea what `success` means to your app.

Your template has become a scroll simulator and you still haven't written any actual features.

elyui keeps Material's brain and throws out its wardrobe.

---

## The pitch

Every elyui snippet below is real, working API — the same inputs the demo page in this repo exercises. Nothing here is aspirational marketing.

### Buttons

**Angular Material.** Two module imports, one size, and whatever colors your theme palette happens to define:

```ts
imports: [MatButtonModule, MatIconModule]
```

```html
<button matButton="filled">
  <mat-icon>star</mat-icon>
  favorite
</button>
```

Want it small? Material has no size scale — that's your CSS to write. Want it green *because it's a success action*? Material gives you your theme's primary / secondary / tertiary / error. There's no `success`, no `warning`. So you're overriding `--mdc-*` custom properties or reaching into `.mat-mdc-button-base` internals, per state, forever.

**elyui.** One import, one line, and every axis is just an attribute:

```html
<ely-button appearance="filled" variant="success" size="md" icon="star">favorite</ely-button>
```

| Input | Values |
| --- | --- |
| `appearance` | `filled` · `tonal` · `outlined` · `ghost` · `link` · `icon` |
| `variant` | `neutral` · `primary` · `accent` · `success` · `warning` · `danger` |
| `size` | `xs` · `sm` · `md` · `lg` |
| `icon` | any Material Icons ligature — no `<mat-icon>` nesting |
| `hasBorder` / `hasRadius` | `false` for a seamless or square look |
| `width` | `width-auto` · `width-filled` |

That's 144 combinations of appearance × variant × size out of a single tag, and not one line of CSS on your side:

```html
<ely-button appearance="tonal" variant="danger" size="xs">delete</ely-button>
<ely-button appearance="outlined" variant="warning" icon="star">favorite</ely-button>
<ely-button appearance="icon" variant="accent" icon="bookmark" />
<ely-button appearance="filled" variant="primary" [hasRadius]="false">square</ely-button>
```

### Badges

Careful with names here: Material's `matBadge` is the little notification dot that floats over another element — not this. The closest Material analogue to a status label is a **chip**, which was designed for input and filtering, not for labelling state:

```html
<mat-chip-set>
  <mat-chip>Active</mat-chip>
</mat-chip-set>
```

A chip is meant to live inside a `<mat-chip-set>` (or `mat-chip-listbox` / `mat-chip-grid`), so a single status label drags a wrapper element along with it. And there is no variant, no size, no semantic color — **every chip looks identical**. One green "Active" and one red "Overdue" means hand-writing CSS against `.mat-mdc-chip` internals for each state your app has.

**elyui:**

```html
<ely-badge variant="success" size="md">Active</ely-badge>
<ely-badge variant="danger" [hasCloseIcon]="true">Overdue</ely-badge>
<ely-badge variant="primary" [hasBadgeIcon]="true">Info</ely-badge>
<ely-badge variant="neutral" [hasBorder]="false">Seamless</ely-badge>
```

Same six variants, same four sizes, no wrapper. `hasBadgeIcon` prepends an info icon, `hasCloseIcon` appends a dismiss icon that emits `(closed)`.

### Icons

This one's closer to a fair fight — `<mat-icon>star</mat-icon>` is already short. The friction is everything around it.

`mat-icon` is locked to 24px, and resizing it is the classic Material gotcha: setting `font-size` alone leaves the element's `width` and `height` at 24px, so your layout quietly breaks until you remember to write all three. Color inherits `currentColor`, so semantic coloring is on you. A tooltip is another module import.

```html
<mat-icon class="icon-lg-success" matTooltip="done">star</mat-icon>
```

```css
.icon-lg-success {
  font-size: 32px;
  width: 32px;   /* don't forget */
  height: 32px;  /* seriously, don't forget */
  color: #539364;
}
```

**elyui:**

```html
<ely-icon name="star" size="lg" variant="success" tooltip="done" />
```

Sizes and variants come from the same scale every other component uses, so an `md` icon lines up with an `md` button without you measuring anything. `[clickable]="false"` drops the pointer cursor when it's decorative.

### Snackbars

The one that hurts most. In Material you have to author an entire component before you can show a single toast:

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

**1. Import the theme.** Add it to your `angular.json` `styles` array (or `@import` it from your own global stylesheet). This defines every CSS variable the components render with — without it, components render unstyled:

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
import { Button, Badge, Icon } from '@paulelyson/elyui';

@Component({
  selector: 'app-example',
  imports: [Button, Badge, Icon],
  template: `
    <ely-button appearance="filled" variant="primary" icon="save">Save</ely-button>
    <ely-badge variant="success">Active</ely-badge>
    <ely-icon name="star" size="lg" variant="warning" tooltip="favorite" />
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

Pre-1.0. The API may still shift as more components land. Pin the version if that bothers you.

## License

MIT.
