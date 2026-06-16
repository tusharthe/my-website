# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install        # install dependencies
npm run dev        # Vite dev server (http://localhost:5173), SPA history fallback handled
npm run build      # production build to dist/
npm run preview    # serve the built dist/ locally
```

There is **no test runner, linter, or formatter** configured. Do not invent `npm test`/`npm run lint` commands.

Requires a `.env` file (gitignored). Copy `.example.env` and fill in keys. All vars are `VITE_`-prefixed and read via `import.meta.env.*` — restart the dev server after changing them.

## Architecture

Single-page Vue 3 portfolio (Composition API, `<script setup>`) built with Vite 7, vue-router 4 (HTML5 history mode), and Tailwind CSS v4. Tailwind runs through the `@tailwindcss/vite` plugin with **zero config file** — there is no `tailwind.config.js`; design tokens live as CSS variables instead.

**App shell** — `main.js` mounts `App.vue`, which renders the persistent chrome around `<router-view>`: `GridBackground`, `AppPreloader` (home route only), `AppNav`, `AppFooter`, `ChatWidget`. `App.vue` calls `useTheme()` once to apply the saved theme on boot. The home page (`HomeView.vue`) is a stack of section components from `src/components/home/`; other routes are blog list/article views.

**Composables are module-level singletons.** In `src/composables/*`, reactive state (`ref(...)`) is declared *outside* the exported `use*()` function, so every caller shares one global instance — there is no per-component state and no provide/inject. This is the app's state-management pattern; keep it in mind when adding state.
- `useTheme` — drives three independent axes, all persisted to `localStorage`: color **palette** via `data-theme` on `<html>` (`default`/emerald/sunset/ocean/royal/crimson), **layout** via `data-layout` on `<body>` (quantum/minimal/terminal/brutalist/corporate/retro/cyberpunk), and **light/dark** via a `light-mode` class on `<body>`.
- `useChatbot` — Gemini-backed assistant (see below).
- `useSoundEngine` — Web Audio API blips, muted by default.

**Theming system** — all visual variation is pure CSS in `src/assets/style.css` (the only stylesheet actually imported; `src/style.css` is dead and unused). The `:root` block defines the default palette; `[data-theme="..."]` blocks override color variables; `body[data-layout="..."]` blocks restyle shared classes (`.glass-card`, `.tech-badge`, `.section-label`, etc.) to produce each look. To add a palette/layout: add the CSS block here **and** the option to the picker in `AppNav.vue`. Note the README's display names differ from the CSS keys (e.g. "Neo-Brutal" = `brutalist`, "Retro 95" = `retro`).

**AI chatbot** — `useChatbot.js` instantiates `GoogleGenAI` from `@google/genai` at module load using `VITE_GEMINI_API_KEY`; if the key is missing/placeholder, `ai` stays `null` and the widget shows a config warning instead of calling the API. The assistant's entire knowledge base is the `SYSTEM_INSTRUCTION` template string in this file — **edit that constant to change what the bot knows.** Model is `gemini-2.5-flash`. Responses are rendered with a hand-rolled `convertMarkdownToHTML` regex function (the `marked` dependency is **not** used here despite being installed).

**Blog integration** — two independent sources, each with a list view + article view:
- **DEV.to** (REST): `BlogDevtoView` / `ArticleDevtoView`. Page-number pagination; article body is pre-rendered `body_html`.
- **Hashnode** (GraphQL POST to `VITE_HASHNODE_GQL_ENDPOINT`): `BlogHashnodeView` / `ArticleHashnodeView`. Cursor-based pagination; article body is `content.html`.

Each list view fetches a personal feed and a community feed in parallel. `BlogCard.vue` normalizes the two differently-shaped payloads and builds the router link to the article view via **query params** (`?id=` for DEV.to, `?slug=&host=` for Hashnode); the article view re-fetches the full post from those params. Article HTML comes from the external API and is injected with `v-html`.
