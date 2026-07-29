
# Project Rules

# CLAUDE.md

## Project Overview

This project is an Angular custom component library, published to npm as `@paulelyson/elyui` (an ng-packagr Angular Package Format library, scoped under the author's npm username because the bare `elyui` name was rejected by npm for being too similar to existing packages). Consumers `npm install @paulelyson/elyui` and `import { Button } from '@paulelyson/elyui'`.

The repo is a workspace with two projects: `projects/elyui/` is the library itself — the only thing that ships — and the root `src/` is a demo app that consumes the library exactly like an external project would (via the `elyui` path mapping in `tsconfig.json`, which is just this workspace's internal dev alias and independent of the published package name), doubling as a living overview page for every component. The root workspace stays `"private": true` and is never published; only `projects/elyui/package.json` (`name: "@paulelyson/elyui"`) is.

A shadcn/ui-style copy-source CLI + registry was considered and is intentionally **deferred** — see `docs/registry-design.md` for the rationale and the preserved schema. Revisit only if this goes open-source and people actually ask for it.

The current objective is to **migrate custom components from the source project into `projects/elyui/src/lib/`**, so they ship in the published package.

Some components are still lacking or underdeveloped. Thats is expected and acceptable — **the priority is to copy ALL components over first, as-is. Enhancement comes later.** Do not refactor, "improve", or restructure a component during the copy phase unless explicitly instructed.

## Design Philosophy

The components are **Angular Material under the hood, dressed in custom minimalist CSS**. Material provides the behavior (a11y, keyboard handling, overlays, CVA plumbing); the library strips its visual identity and replaces it with a clean, minimal skin.

Guiding principles:

1. **Minimalistic look.** Remove Material's ripple effect, default backgrounds, and visual ornamentation. Flat and clean by default.
2. **Theming via CSS variables only.** Primary, accent, and other theme colors must be overridable by simply updating CSS variables (e.g. `--color-primary-*`, `--color-accent-*`) — no rebuilds, no Material theming API required by consumers.
3. **Full control over focus glow.** The focus glow/ring is configurable — components must expose a way to disable it (e.g. an input), never hard-force it.
4. **DX first.** Using a component should be ONE line of HTML with sensible defaults — e.g. `<app-autocomplete [options]="opts" />` instead of the mountain of markup raw Material autocomplete requires. Verbosity lives inside the library, never in the consumer's template.

When enhancing components (post-copy phase), these principles decide what "done" looks like. During migration, they inform the per-component decision of how much Material to keep: keep the behavior, strip the skin.

### Reference standard: Badge

`projects/elyui/src/lib/components/badge/` is the reference implementation for how a fully-tokenized component should look. When enhancing any component's CSS (post-copy phase), follow its pattern:

- **No hardcoded pixel values for anything that scales with `size`** — padding, border-radius, gap, and font-size must all come from a `--<property>-xs/sm/md/lg` CSS variable, defined once in `projects/elyui/styles/elyui.css` (the shipped theme) and referenced per size class (see `--padding-*`, `--border-radius-*`, `--gap-*`, `--font-size-*`).
- **No hardcoded colors** — background, text, and border colors come from semantic `--color-bg-*`, `--color-text-*`, `--color-border-*` variables, never literal hex/rgb in a component's `.css` file.
- **Fixed structural values stay hardcoded** — e.g. badge's `min-width: 40px` is a layout constraint, not a design token, so it is not tokenized. Only values that should scale with `size` or vary with `variant`/theme get promoted to a variable.
- When adding a new size-scalable property to any component, add the corresponding `--<property>-xs/sm/md/lg` variables to `src/styles.css` rather than inlining a pixel value.
- Every component gets a `hasBorder`-style boolean input (default `true`) if it has a border, so consumers can opt into a seamless/borderless look — mirrors badge's `hasBorder`.

When migrating or enhancing a component, check its CSS against this standard and update accordingly: no leftover hardcoded pixels or colors for anything size- or theme-dependent.

## Migration Workflow — STRICT RULES

The migration is done **one component at a time, only on my explicit go signal**:

1. **Never copy a component unless I explicitly tell you which one to copy.**
2. Copy exactly ONE component per instruction (e.g., "copy the button component" means the button component only — not its siblings).
3. After copying a component, **STOP and wait for my next instruction.** Do not proceed to the next component, do not suggest batching, do not queue up work.
4. If a component has dependencies on other components not yet copied, report this to me and wait — do not copy the dependencies automatically.
5. Before writing any files, briefly state which files you are about to copy and where. Proceed only after confirmation if there is any ambiguity.
6. I have full control of the order and pace of this migration. Your job is to execute one step, then hand control back to me.

Example flow:
- Me: "Copy the button component."
- You: copy button component files → summarize what was copied → **wait**.
- Me: "Next, copy the card component."
- You: copy card component → summarize → **wait**.

### Source-quality classification (added after v0.1.0 shipped)

The "copy as-is, no enhancement" rule assumes the source component is *good*. Several remaining source components are stubs, carry bugs, or have completely empty `.css` files — for those, strict copying would import defects into a **published** package.

So before copying, classify the source and say which it is:

- **`solid`** — copy as-is. The rule above is unchanged.
- **`stub` / `broken` / `unstyled`** — flag it, state specifically what's missing or wrong and what would need building, then **wait for my call.** Do not silently copy the defect, and do not silently fix it either.

Known cases: the form controls `autocomplete`, `datepicker`, `dropdown`, and `tab` have 0-byte stylesheets — **I have already decided these get a proper minimalist skin built during migration**, to the Badge tokenization standard. `avatar` (hardcoded `placehold.co` URL, crashes on empty label), `empty-placeholder` (hardcoded "No items." string, no input), `side-navigation` (near-stub, no API), and `file-input` (temporary server-migration message in the template) all need flagging when their turn comes.

`toggle-button-group` is **dropped from the migration entirely** — it's an empty stub already superseded by `SegmentedControl`.

The one-component-per-go-signal rule is untouched by any of this.

## Coding Style

When enhancement or new code IS requested, match my existing coding style. Consistency with the existing codebase takes priority over newer idioms.

- **Use `@Input()` decorators, NOT the `input()` signal function.** Only use `input()` when strictly necessary (e.g., a feature genuinely requires signal inputs). Same principle applies to `@Output()` over `output()`.
- Always use explicit TypeScript return types on functions and methods.
- Follow the existing patterns in already-migrated components — file naming, folder structure, import style (relative imports within `projects/elyui/src/lib/`; the demo app imports the library via the `elyui` path mapping, same as an external consumer) — rather than introducing new conventions.
- When in doubt about a style decision, ask me instead of guessing.

## Out of Scope (unless explicitly asked)

- Do not rename components or files during migration.
- Do not add new features to components while copying them.
- Do not modify `projects/elyui/styles/elyui.css` (the shipped theme) unless the task requires it.
- Do not run `npm publish` or any registry-publishing command. Ever. That is manual.
- Your job is to update the codebase ONLY.
- NEVER run the app, tests, or any shell commands to verify changes.
  I (the developer) handle all testing manually.
- After editing, just summarize what changed and tell me what to test.
