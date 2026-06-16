# UNDERSTAND.md — Architecture Deep Dive

A longer companion to `CLAUDE.md`, explaining *how* and *why* this codebase fits together. Read this once to get oriented; `CLAUDE.md` is the quick reference.

## 1. What this is

A personal portfolio for Tushar Kanti Parial, built as a Vue 3 single-page app. Beyond a static résumé it has three "live" features: a multi-theme visual engine, a Google Gemini AI chat assistant, and a blog reader that pulls articles from DEV.to and Hashnode at runtime. There is no backend of its own — everything runs in the browser and talks directly to third-party APIs using `VITE_`-prefixed keys baked in at build time.

## 2. Tech stack and tooling

| Concern        | Choice                                   | Notes |
|----------------|------------------------------------------|-------|
| Framework      | Vue 3 (Composition API, `<script setup>`) | No Vuex/Pinia |
| Build          | Vite 7                                    | `vite.config.js` is minimal: `vue()` + `tailwindcss()` plugins |
| Routing        | vue-router 4, HTML5 history mode          | Lazy-loaded route components |
| Styling        | Tailwind CSS v4 via `@tailwindcss/vite`   | **No `tailwind.config.js`** — tokens are CSS variables |
| Icons          | `lucide-vue-next`                         | |
| AI             | `@google/genai` (Gemini 2.5 Flash)        | Called client-side |
| Markdown       | `marked` (installed) — but see §6, not actually used in the chatbot |

No testing, linting, or formatting tooling exists. The only npm scripts are `dev`, `build`, `preview`.

## 3. Boot sequence

1. `index.html` loads `/src/main.js` into `#app`. Fonts (Inter, JetBrains Mono, Space Grotesk) are pulled from Google Fonts in the `<head>`. The `<body>` ships with `data-layout="quantum"` as a default.
2. `main.js` creates the app, installs the router, imports `./assets/style.css`, and mounts.
3. `App.vue` is the shell. It calls `useTheme()` (which immediately applies the persisted palette/layout/mode to the DOM) and renders the fixed chrome — background, nav, footer, chat widget — with `<router-view>` in the middle. `AppPreloader` only shows on `/`.

## 4. The singleton-composable state model

This is the single most important pattern to understand. Every composable in `src/composables/` declares its reactive state at **module scope**, outside the exported function:

```js
// useTheme.js (shape)
const theme  = ref(localStorage.getItem('portfolio_theme')  || 'default')
const layout = ref(localStorage.getItem('portfolio_layout') || 'quantum')
const isDark = ref(localStorage.getItem('portfolio_mode') !== 'light')

export function useTheme() { /* returns the same refs + setters every time */ }
```

Because ES modules are evaluated once, every component that calls `useTheme()` / `useChatbot()` / `useSoundEngine()` shares **one** instance of that state. This is deliberate — it's how the app shares global state (theme, chat history, mute flag) without a store library or provide/inject. When adding new cross-component state, follow this convention; if you genuinely want per-component state, declare the `ref` *inside* the function instead.

The three composables:
- **`useTheme`** — `setTheme`/`setLayout`/`toggleMode` each mutate a ref, write to `localStorage`, and re-apply DOM attributes. The DOM is the source of truth that CSS reacts to (see §5).
- **`useChatbot`** — owns `isOpen`, the `messages` array, and the Gemini client. See §6.
- **`useSoundEngine`** — lazily creates an `AudioContext` on first `toggle()`, then `play('hover'|'click'|'send')` synthesizes short oscillator tones. Muted by default; no-ops while muted.

## 5. Theming: three orthogonal axes, all in CSS

Visual variety is achieved entirely through CSS variables in `src/assets/style.css` — **not** through Vue logic. `useTheme` only toggles DOM hooks; the cascade does the rest. The three axes are independent and combine freely:

| Axis    | DOM hook                         | Values |
|---------|----------------------------------|--------|
| Palette | `data-theme` on `<html>`         | `default` (the `:root` "Prism" palette), `emerald`, `sunset`, `ocean`, `royal`, `crimson` |
| Layout  | `data-layout` on `<body>`        | `quantum` (default), `minimal`, `terminal`, `brutalist`, `corporate`, `retro`, `cyberpunk` |
| Mode    | `light-mode` class on `<body>`   | dark (default) / light |

- **Palette** blocks (`[data-theme="emerald"]`, …) redefine `--color-primary/secondary/tertiary` and their `-rgb` companions plus the gradient. Everything else references these variables.
- **Layout** blocks (`body[data-layout="terminal"]`, …) re-skin a shared set of utility classes — `.glass-card`, `.tech-badge`, `.section-label`, `.text-gradient-flow`, headings — to produce dramatically different looks (glassmorphism, brutalist hard shadows, Windows-95 bevels, etc.) from the same markup.
- **Light mode** and some `html[data-theme=...] body.light-mode` combos tweak background/text variables.

**To add a palette or layout:** add the corresponding CSS block in `style.css` *and* register the option in the picker UI in `src/components/layout/AppNav.vue` (it lists the keys explicitly). Beware: the README markets friendlier names than the CSS keys — "Neo-Brutal" → `brutalist`, "Retro 95" → `retro`, and the default palette is called "Cosmic"/"Prism".

> Gotcha: `src/style.css` exists but is **not imported anywhere** (only `src/assets/style.css` is). Edit `assets/style.css`.

## 6. The AI chatbot

`src/composables/useChatbot.js` is self-contained:
- At **module load**, it reads `VITE_GEMINI_API_KEY` and constructs `new GoogleGenAI({ apiKey })`. If the key is absent or still the placeholder, `ai` is left `null` and `sendMessage` short-circuits to a "not configured" message — the UI degrades gracefully without a key.
- The bot's knowledge is a single large `SYSTEM_INSTRUCTION` template literal (experience, skills, projects, contact, answering rules). **This string is the knowledge base** — to update what the assistant says about Tushar, edit it here. There is no external data file.
- `sendMessage` pushes the user message, shows a "Thinking…" placeholder, calls `ai.models.generateContent({ model: 'gemini-2.5-flash', contents: SYSTEM_INSTRUCTION + question, config: { maxOutputTokens, temperature } })`, then replaces the placeholder with the rendered reply.
- Rendering uses a **hand-written `convertMarkdownToHTML`** (regex for bold/italic/code/links/lists). The installed `marked` package is *not* wired into this path — don't assume it is. User input is escaped via `escapeHtml` before display.

`ChatWidget.vue` is the presentational layer over this composable.

## 7. Blog subsystem

Two sources, structurally parallel, each with a **list view** and an **article view**, glued by `BlogCard.vue`.

```
BlogDevtoView ─┐                            ┌─ ArticleDevtoView   (?id=…)
               ├─ BlogCard (normalizes) ──→ │
BlogHashnodeView ┘                          └─ ArticleHashnodeView (?slug=&host=…)
```

- **DEV.to** uses a REST endpoint (`VITE_DEVTO_API_BASE`) with `username` + page-number pagination. Article body arrives pre-rendered as `body_html`.
- **Hashnode** uses a GraphQL POST (`VITE_HASHNODE_GQL_ENDPOINT`) with host-scoped queries and **cursor** pagination (`pageInfo.endCursor` / `hasNextPage`). Article body is `content.html`.

Each list view fetches two feeds — a personal feed and a community feed — independently, each with its own loading/page/cursor/hasMore state and "Load More" button. `BlogCard` is the adapter: it reads whichever field shape applies (`cover_image` vs `coverImage.url`, `tag_list` vs `tags[].name`, `reading_time_minutes` vs `readTimeInMinutes`) and constructs a router link carrying only an identifier. The article view then **re-fetches the full post** from that identifier on mount and injects the returned HTML with `v-html`.

Implication: list and detail are decoupled by URL params, so deep-linking to `/article/...?id=` works, but it costs a second network round-trip per article and trusts the source's HTML.

## 8. Configuration & environment

All runtime config is environment variables, consumed via `import.meta.env.VITE_*` and therefore inlined at build time (they are **not** secret — anything in `.env` ships to the browser). Keys (see `.example.env`):

- `VITE_WEB3FORMS_KEY` — contact form (Web3Forms).
- `VITE_DEVTO_USERNAME`, `VITE_DEVTO_API_BASE` — DEV.to feed.
- `VITE_HASHNODE_GQL_ENDPOINT`, `VITE_HASHNODE_MY_HOST`, `VITE_HASHNODE_COMMUNITY_HOST` — Hashnode feeds.
- `VITE_GEMINI_API_KEY` — chatbot.

`.env` is gitignored; `.example.env` is the template.

## 9. Deployment notes

`npm run build` emits a static `dist/`. Because routing uses HTML5 history mode, the production host must rewrite unknown paths to `index.html` (SPA fallback) or refreshing `/blog/devto` will 404. The dev server and `vite preview` handle this automatically.

## 10. Known quirks / gotchas (quick list)

- Composable state is global by design (§4) — easy to trip over if you expect fresh state per component.
- `src/style.css` is dead; the live stylesheet is `src/assets/style.css`.
- `marked` is a dependency but unused; the chatbot uses its own markdown converter.
- README names for themes/layouts ≠ CSS keys (§5).
- README says "Gemini 2.0 Flash"; the code actually calls `gemini-2.5-flash`.
- API keys are client-side and public after build — there is no server to hide them.
