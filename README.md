# PBS

FastAPI backend with a Bun, React, Tailwind, and shadcn frontend.

## Setup

```bash
bun install
uv sync
```

## Development

Start the backend on port 8000:

```bash
uv run uvicorn main:app --reload --port 8000
```

Start the Bun development server on port 3000 in another terminal:

```bash
bun dev
```

The browser calls `/api/*` on port 3000. Bun proxies those requests to FastAPI on port 8000.

## Checks

```bash
bun run lint
bun run build
```

## Production

Build the frontend, then run FastAPI. FastAPI serves both `/api/*` and the built `dist/` frontend.

```bash
bun run build
uv run uvicorn main:app --host 0.0.0.0 --port 8000
```

Build and run the production container with:

```bash
docker build -t pbs .
docker run --rm -p 8000:80 pbs
```
