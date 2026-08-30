# AGENTS.md

This repository is optimized for hackability. A capable engineer should be able to open it, find the execution path, and fix a bug within one minute.

## Prime Directive

- Keep the code boring, local, explicit, and searchable.
- Solve the problem that exists now. Do not build for a hypothetical future.
- Prefer deleting code over making unused code configurable.
- Prefer a direct implementation over a framework, layer, registry, factory, or facade.
- Add an abstraction only when current code becomes simpler because of it.
- Keep dependencies few and justified by code that exists today.
- Make failures loud. Do not silently recover from programmer or configuration errors.

## Repository Map

- `main.py`: FastAPI application, API routes, and production frontend serving.
- `src/index.ts`: Bun development server and local `/api/*` proxy to port 8000.
- `src/frontend.tsx`: browser entrypoint.
- `src/App.tsx`: application UI and behavior.
- `src/components/ui/`: shadcn-owned component source.
- `styles/globals.css`: Tailwind import and shadcn theme tokens.
- `build.ts`: fixed production frontend build.
- `Dockerfile`: production image.

Do not introduce a new directory or architectural layer unless this map is no longer enough to locate code quickly.

## Commands

```bash
bun install
uv sync
uv run uvicorn main:app --reload --port 8000
bun dev
bun run lint
bun run lint:fix
bun run build
```

Development uses two processes: FastAPI on port 8000 and Bun on port 3000. Production builds `dist/` and serves it from FastAPI.

## File Design

- Aim for roughly 100 lines per handwritten file. This is a signal, not a hard limit.
- Each file should own one coherent piece of behavior and be understandable on its own.
- Keep related control flow together. Do not make readers jump across files to understand one operation.
- If behavior is genuinely complex, prefer one structured 500-line file over twenty tiny files connected by indirection.
- Split a file only when the extracted part has a clear independent job, not to satisfy a line count.
- Use concrete, searchable names. Avoid generic names such as `manager`, `service`, `handler`, or `utils` unless they are literally accurate.
- Keep constants near their use unless they are shared by current callers.
- Delete dead exports, unused components, stale flags, and compatibility code with no active consumer.

## Frontend

- Use a plain shadcn component first.
- Adjust it at the call site with Tailwind utilities second.
- Use a CSS module only when substantial custom styling cannot stay readable in Tailwind.
- Keep global CSS limited to theme tokens, resets, and truly global behavior.
- Keep generated shadcn components close to upstream. Do not restyle or abstract their internals without a concrete need.
- Add shadcn components when they are needed; do not stockpile unused components.
- Use React state and effects only for actual synchronization. Derive values during render when possible.
- Keep API calls close to the UI that owns them until multiple current callers justify extraction.

## Python

- Use the standard library first.
- Use framework primitives directly second.
- Write a small local helper only when the direct code is repeated or harder to read.
- Do not create service, repository, domain, schema, or utility layers for a simple route.
- Keep request flow visible from route to result.
- Add a dependency only when a short local implementation would be less clear, less safe, or less correct.

## Configuration And Tooling

- Prefer tool defaults. Configure only decisions this repository intentionally enforces.
- Keep scripts fixed and obvious. Do not expose options without a current caller.
- Use Bun for JavaScript dependency management and commands.
- Use uv for Python dependency management and commands.
- Keep Oxlint clean. Disable a rule only for a documented false positive or an intentional upstream pattern.
- Never hand-edit lockfiles or generated build output.

## Verification

- Run `bun run lint` after JavaScript or TypeScript changes.
- Run `bun run build` after frontend, dependency, or build changes.
- Exercise changed API routes against the running FastAPI app.
- Test through the Bun proxy when changing local development networking.
- Add a focused test when behavior is easy to regress and a test can exercise the real boundary without mocks or scaffolding.
- Do not add test abstractions before there are repeated test patterns.

## Decision Rule

When two approaches work, choose the one with fewer concepts, fewer files, fewer dependencies, and less code. If a rule here conflicts with a concrete product requirement, satisfy the product requirement and keep the exception local.
