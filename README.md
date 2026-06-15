# Automated-App

A personal portfolio site for a **Senior DevOps / AI / Security engineer**, built as a modern single-page application. The codebase is intentionally lightweight: a fast Vite + React + TypeScript front-end, styled with Tailwind, containerised with a multi-stage Docker build, and wired up with security scanning in CI.

---

## Table of Contents

1. [Stack](#stack)
2. [Project Layout](#project-layout)
3. [Getting Started](#getting-started)
4. [Available Scripts](#available-scripts)
5. [Path Aliases](#path-aliases)
6. [Styling System](#styling-system)
7. [Docker](#docker)
8. [CI Pipeline](#ci-pipeline)
9. [Pre-commit Hooks](#pre-commit-hooks)
10. [Observability](#observability)
11. [Environment & Tooling Versions](#environment--tooling-versions)
12. [Common Tasks](#common-tasks)

---

## Stack

### Front-end
| Layer | Technology | Why |
|---|---|---|
| UI library | **React 18.3** | Component model with concurrent rendering |
| Language | **TypeScript 5.6** (`strict: true`) | Type safety, better refactoring, IDE feedback |
| Build tool | **Vite 6** | Sub-second HMR, native ESM, Rollup-based prod build |
| Routing | **react-router-dom 6** | Client-side routing, nested routes |
| Icons | **lucide-react** | Tree-shakeable, consistent stroke-based icon set |
| Styling | **Tailwind CSS 3.4** | Utility-first CSS, design tokens via `tailwind.config.js` |
| CSS pipeline | **PostCSS 8** + **Autoprefixer 10** | Vendor prefixing and Tailwind processing |

### Tooling
- **ESLint 9** (flat config) with `typescript-eslint`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh`.
- **TypeScript project references** — `tsconfig.json` aggregates `tsconfig.app.json` (app code under `src/`) and `tsconfig.node.json` (build config: `vite.config.ts`).
- **`@types/node`** is installed as a dev dependency so `vite.config.ts` (which uses `node:url`) type-checks.

### Container & Delivery
- **Docker** with a two-stage `Dockerfile`:
  1. `node:20-alpine` build stage runs `npm ci` + `npm run build`.
  2. `nginx:1.27-alpine` runtime stage serves the static `dist/` output with an SPA-aware config.
- **docker-compose** maps the container to `http://localhost:8081`.
- **`.dockerignore`** keeps `node_modules`, `.git`, and dev configs out of the build context.

### Quality Gates
- **GitHub Actions CI** runs on every push and PR to `main`.
- **Trivy filesystem scan** fails the build on `CRITICAL` or `HIGH` vulnerabilities.
- **pre-commit** runs hygiene hooks (whitespace, EOF, YAML/JSON validity, merge-conflict markers) before commits reach the remote.

### Observability
- **`prometheus.yml`** is committed to the repo with a default scrape interval of 5 s, scraping `localhost:9090`. It is a placeholder for whoever wires up an exporter; it is not consumed by the React app itself.

---

## Project Layout

```
.
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions: Trivy fs scan
├── .pre-commit-config.yaml     # pre-commit hooks config
├── .dockerignore
├── .gitignore
├── docker-compose.yml          # Local container orchestration
├── Dockerfile                  # Multi-stage Vite → nginx image
├── nginx.conf                  # SPA fallback + asset caching
├── prometheus.yml              # Placeholder Prometheus scrape config
├── eslint.config.mjs           # Flat ESLint config
├── postcss.config.js           # Tailwind + Autoprefixer pipeline
├── tailwind.config.js          # Design tokens (colors, fonts, sizes)
├── tsconfig.json               # Project references root
├── tsconfig.app.json           # Strict TS config for src/
├── tsconfig.node.json          # TS config for vite.config.ts
├── vite.config.ts              # Vite + React + @ alias
├── index.html                  # Vite entry HTML
├── package.json
└── src/
    ├── main.tsx                # React root + BrowserRouter
    ├── App.tsx                 # Top-level <Routes>
    ├── index.css               # Tailwind directives + design-system layer
    ├── components/             # AppSidebar, Sidebar, SectionHeading
    ├── pages/                  # HomePage, NotFoundPage, *Section
    ├── data/                   # mockData (static content)
    ├── hooks/                  # useActiveSection, useContactForm, …
    ├── services/               # contactApi, contactService
    ├── types/                  # Shared TypeScript types
    └── utils/                  # icons helper, misc utilities
```

---

## Getting Started

### Prerequisites
- **Node.js 20+** (matches the build image in the Dockerfile).
- **npm 10+** (ships with Node 20).

### Install
```bash
npm install
```

### Run the dev server
```bash
npm run dev
```
Vite is configured with `host: true` and `port: 5173`, so it is reachable at:
- Local: `http://localhost:5173`
- LAN:   `http://<your-ip>:5173`

HMR is enabled — edits to any file under `src/` hot-reload without losing component state.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR on port 5173 |
| `npm run build` | Type-check (`tsc -b`) and produce a production build in `dist/` |
| `npm run preview` | Serve the built `dist/` locally via Vite's preview server |
| `npm run lint` | Run ESLint over the whole project |

---

## Path Aliases

The `@/` alias maps to `src/` and is configured in **both** `tsconfig.app.json` (for the type-checker) **and** `vite.config.ts` (for the bundler). Without the Vite-side alias, `tsc` would pass but `vite build` would fail with "Rollup failed to resolve import @/…".

```ts
// Example
import { HomePage } from "@/pages/HomePage";
import { useSkillTabs } from "@/hooks/useSkillTabs";
```

---

## Styling System

Tailwind is the primary styling mechanism, with a custom design system defined in `tailwind.config.js`:

### Color tokens (dark navy + teal accent)
- **Backgrounds:** `bg-primary #0a0e1a`, `bg-secondary #0f1729`, `bg-card #0f1729`, `bg-hover #1a2238`
- **Accent (teal/cyan):** `accent #2dd4bf`, `accent-hover #14b8a6`, `accent-muted #0f3a35`, `accent-dim #5eead4`
- **Text:** `text-primary #e5e7eb`, `text-secondary #9ca3af`, `text-muted #6b7280`
- **Borders:** `border #1f2937`, `border-accent #2dd4bf`

### Typography
- **Sans:** Inter (loaded via Google Fonts in `index.html`), with system-font fallbacks
- **Mono:** JetBrains Mono (loaded via Google Fonts), with `Fira Code`, `Consolas`, `Monaco` fallbacks

### Component utilities (`src/index.css` `@layer components`)
- `.section-label` — uppercase mono label in accent color
- `.heading-xl` — large bold heading in white
- `.card` / `.card-hover` — bordered card surface with hover state
- `.stat-card` — card with standard padding
- `.input-field` — form input with focus ring
- `.btn-primary` — primary call-to-action button
- `.tag` — pill-style label

### Global styles
- A subtle teal grid is layered on `body` as a background pattern.
- Custom scrollbar (8 px, accent on hover).
- `:focus-visible` rings on the accent color for keyboard accessibility.

---

## Docker

### `Dockerfile` (multi-stage)
```dockerfile
# Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY tsconfig*.json vite.config.ts postcss.config.js tailwind.config.js index.html ./
COPY src ./src
RUN npm run build

# Stage 2: runtime
FROM nginx:1.27-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Key properties:
- **Layer caching:** `package.json` + `package-lock.json` are copied first so `npm ci` only re-runs when dependencies change.
- **Small final image:** only the compiled `dist/` and the nginx config make it into the runtime image.
- **Pinned versions:** `node:20-alpine` and `nginx:1.27-alpine` are explicit (no `latest`).

### `nginx.conf` highlights
- **SPA fallback** — `try_files $uri $uri/ /index.html;` so React Router can serve any deep path on hard refresh.
- **Asset caching** — `/assets/` is served with `Cache-Control: public, immutable` and a 1-year expiry (Vite's hashed filenames make this safe).
- **gzip** — text/css/js/json/svg compressed when ≥ 1 KB.

### `docker-compose.yml`
```yaml
services:
  web:
    build: .
    ports:
      - "8081:80"
```
Start with:
```bash
docker compose up --build
# Then open http://localhost:8081
```

### `.dockerignore`
Keeps `node_modules`, `.git`, the Dockerfile itself, dev configs, and logs out of the build context.

---

## CI Pipeline

Defined in `.github/workflows/ci.yml`.

**Triggers**
- Push to any branch
- Pull requests targeting `main`

**Jobs**
- **`test`** runs on `ubuntu-latest` and executes:
  - `actions/checkout@v4` — checkout the repo
  - `aquasecurity/trivy-action@0.24.0` — filesystem vulnerability scan
    - Scan type: `fs` (filesystem)
    - Format: `table` (human-readable in CI logs)
    - `exit-code: 1` — the step fails the job if any issue is found
    - Severity filter: `CRITICAL,HIGH` — only blocks the build on serious findings

The current workflow is intentionally narrow: it focuses on supply-chain / dependency vulnerabilities rather than re-running `npm run build` (which is fast and run locally before push). Adding a build job is straightforward — see [Common Tasks](#common-tasks).

---

## Pre-commit Hooks

`.pre-commit-config.yaml` uses `pre-commit/pre-commit-hooks@v5.0.0` with the following checks:

- `trailing-whitespace` — strips trailing spaces
- `end-of-file-fixer` — ensures a final newline
- `check-yaml` — validates YAML syntax (CI, prometheus, pre-commit configs)
- `check-merge-conflict` — refuses commits that contain `<<<<<<<` markers
- `check-json` — validates JSON syntax (package files, tsconfig, etc.)

`node_modules`, `dist`, and `build` directories are excluded.

Install once after cloning:
```bash
pip install pre-commit        # or: brew install pre-commit
pre-commit install
```
Now every `git commit` runs the hooks against staged files.

---

## Observability

`prometheus.yml` ships with the repo as a starter config:

```yaml
global:
  scrape_interval: 5s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']
```

It is **not** consumed by the React app — Prometheus is intended to scrape an exporter (for example `nginx-prometheus-exporter` running alongside the nginx container) that you would add separately. The 5 s scrape interval is aggressive; tune it for your environment.

---

## Environment & Tooling Versions

Pinned or chosen ranges from `package.json`:

| Tool | Version |
|---|---|
| Node | 20+ (matches build image) |
| React | `^18.3.1` |
| react-dom | `^18.3.1` |
| react-router-dom | `^6.28.0` |
| lucide-react | `^0.460.0` |
| Vite | `^6.0.5` |
| TypeScript | `~5.6.2` |
| Tailwind CSS | `^3.4.17` |
| PostCSS | `^8.4.49` |
| Autoprefixer | `^10.4.20` |
| ESLint | `^9.17.0` |
| `typescript-eslint` | `^8.18.2` |
| `eslint-plugin-react-hooks` | `^5.1.0` |
| `eslint-plugin-react-refresh` | `^0.4.16` |
| `@types/node` | (devDep, for `vite.config.ts`) |

---

## Common Tasks

### Add a new dependency
```bash
npm install <package>            # runtime
npm install -D <package>         # dev-only
```
Commit the updated `package.json` and `package-lock.json` together.

### Add a new route
1. Create a component in `src/pages/`, e.g. `ProjectsPage.tsx`.
2. Export it from that file (named export, e.g. `export function ProjectsPage() { … }`).
3. Register it in `src/App.tsx`:
   ```tsx
   <Route path="/projects" element={<ProjectsPage />} />
   ```
4. Link to it with `<Link to="/projects">` from `react-router-dom`.

### Add a new design token
Edit `tailwind.config.js` under `theme.extend.colors` (or `fontFamily`, `fontSize`, etc.). Tailwind picks up the change immediately in `npm run dev`.

### Add a build job to CI
Replace the echo step in `.github/workflows/ci.yml` with:
```yaml
- uses: actions/setup-node@v4
  with:
    node-version: 20
    cache: npm
- run: npm ci
- run: npm run build
- run: npm run lint
```

### Build & run the Docker image manually
```bash
docker build -t automated-app:dev .
docker run --rm -p 8081:80 automated-app:dev
# Open http://localhost:8081
```

### Type-check without building
```bash
npx tsc -b --noEmit
```

### Lint with auto-fix
```bash
npx eslint . --fix
```

---

## License

Not specified — add a `LICENSE` file if you intend to distribute this.
