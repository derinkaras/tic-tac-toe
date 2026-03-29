# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server (default port 5173)
npm run build     # Type-check + production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Git Workflow

Push to `origin/main` after any meaningful change (new feature, bug fix, refactor, structural change). This keeps the remote history usable for reverting. Commit message should briefly describe what changed and why.

```bash
git add <files>
git commit -m "description"
git push
```

## Architecture

Single-page React + TypeScript app using Vite and Tailwind CSS v4.

- **`src/types.ts`** — shared TypeScript types (`Player`, `Cell`, `Board`, `GameState`). All exports are `export type`; always use `import type` when importing from this file.
- **`src/hooks/useGame.ts`** — all game logic (state, win detection, move handling, score tracking) via a single `useGame()` hook.
- **`src/components/Square.tsx`** — single board cell component.
- **`src/App.tsx`** — top-level component; composes the scoreboard, status text, board grid, and reset button using `useGame` and `Square`.

Tailwind is configured via the `@tailwindcss/vite` plugin (v4 API) — no `tailwind.config.js` needed.
