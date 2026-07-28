# RuleBuilder UI

React (Vite) + TypeScript + Tailwind UI for building nested filter rules with live preview.

**Repository folder:** `rulebuilder-ui`

## Stack

- React + Vite + TypeScript
- Tailwind CSS
- Axios API layer
- i18n via JSON (`en` / `hi` / `or`)
- Theme tokens in `src/content/theme.json`
- Docker / Nginx

## Project Structure

```text
rulebuilder-ui/
├── src/
│   ├── components/     # UI + rule builder components
│   ├── content/        # en/hi/or + theme JSON
│   ├── context/
│   ├── pages/
│   ├── services/       # API client layer
│   ├── styles/
│   ├── types/
│   └── utils/
├── docs/screenshots/
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Environment Variables

Copy `.env.example` to `.env`:

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Backend API base URL |
| `VITE_APP_NAME` | App display name |
| `VITE_PORT` | Dev server port |
| `VITE_DEFAULT_LANGUAGE` | `en` \| `hi` \| `or` |
| `VITE_DEFAULT_THEME` | `light` \| `dark` |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth Web Client ID (same as backend) |

## Google Auth

Set `VITE_GOOGLE_CLIENT_ID` in `.env` to enable the Continue with Google button.
Use the same client ID value as backend `GOOGLE_CLIENT_ID`.

## Installation

```bash
npm install
copy .env.example .env   # or: cp .env.example .env
npm run dev
```

App: http://localhost:5173

Point `VITE_API_BASE_URL` at your backend (default `http://localhost:8000/api/v1`).

## Docker

```bash
docker compose up --build
```

## Scripts

```bash
npm run dev
npm run build
npm test
```

## Screenshots

See `docs/screenshots/`:

- `01-login.png`
- `02-rule-builder.png`
- `03-saved-rules.png`
- `04-contacts.png`

## Theme & Content

- Colors/fonts: `src/content/theme.json`
- UI text: `src/content/en.json`, `hi.json`, `or.json`

No UI headings/labels are hardcoded in components.
