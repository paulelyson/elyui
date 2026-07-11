
# Project Rules

# CLAUDE.md

## Project Overview

This project is an Angular custom component library distributed via npm (shadcn/ui-style CLI model). The current objective is to **migrate custom components from the source project into this project's root/registry**, so they can be registered and published on npm.

Some components are still lacking or underdeveloped. Thats is expected and acceptable — **the priority is to copy ALL components over first, as-is. Enhancement comes later.** Do not refactor, "improve", or restructure a component during the copy phase unless explicitly instructed.

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

## Coding Style

When enhancement or new code IS requested, match my existing coding style. Consistency with the existing codebase takes priority over newer idioms.

- **Use `@Input()` decorators, NOT the `input()` signal function.** Only use `input()` when strictly necessary (e.g., a feature genuinely requires signal inputs). Same principle applies to `@Output()` over `output()`.
- Always use explicit TypeScript return types on functions and methods.
- Follow the existing patterns in already-migrated components — file naming, folder structure, import style (`@/` alias convention) — rather than introducing new conventions.
- When in doubt about a style decision, ask me instead of guessing.

## Out of Scope (unless explicitly asked)

- Do not rename components or files during migration.
- Do not add new features to components while copying them.
- Do not modify `global.css` / theme entries unless the task requires it.
- Do not run `npm publish` or any registry-publishing command. Ever. That is manual.
- Your job is to update the codebase ONLY.
- NEVER run the app, tests, or any shell commands to verify changes.
  I (the developer) handle all testing manually.
- After editing, just summarize what changed and tell me what to test.
