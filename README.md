# Riot Take-Home Technical Challenge

## Requirements

- **Node.js**: 22 (project uses `@tsconfig/node22`)
- **npm**: comes with Node

## Usage

- **Install**

```bash
npm i
```

- **Run in development (watch mode)**

```bash
npm run dev
```

- **Build (TypeScript -> `dist/`)**

```bash
npm run build
```

- **Run production build**

```bash
npm run start
```

By default the server listens on `PORT=3000` (override via `PORT`).

## Project structure

- **`src/server.ts`**
  - Process entrypoint used by `npm run dev` and `npm run start`.
  - Starts the HTTP server by calling `app.listen(...)`.
- **`src/app.ts`**
  - Express app composition.
  - Middleware: `cors`, JSON body parsing, swagger docs at `GET /docs`.
  - Mounts routers (see `src/routes/*`).
- **`src/routes/*`**
  - Express routers that define the HTTP endpoints.
  - Instantiate controllers and wire them to routes.
- **`src/controllers/*`**
  - Request-level business logic.
  - Call into services/helpers to perform crypto/signing operations.
- **`src/helper/*`**
  - Reusable services.
  - `crypto.ts`: `EncryptionService` + Base64 implementation.
  - `sign.ts`: `SignatureService` + HMAC implementation (order-independent signing).
