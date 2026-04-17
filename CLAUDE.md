# strapi-app

Strapi 5 CMS recipe on Zerops with PostgreSQL, S3-compatible object storage, and Mailpit — shared `base` setup extended by `prod` and `dev`.

## Zerops service facts

- HTTP port: `1337`
- Siblings:
  - `db` (PostgreSQL) — env: `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`
  - `storage` (Object Storage) — env: `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_ENDPOINT_URL`, `S3_ENDPOINT_HOST`, `S3_BUCKET_NAME`
  - `mailpit` (SMTP mock) — env: `SMTP_HOST`, `SMTP_PORT` (override via `SMTP_HOST_OVERRIDE` / `SMTP_PORT_OVERRIDE`)
- Runtime base: `nodejs@22` (Ubuntu on dev)

## Zerops dev

`setup: dev` defines no `start` command — the container stays idle after `npm install` and `zsc execOnce -- npm run seed:example` complete; the agent starts the dev server.

- Dev command: `npm run develop` (alias `npm run dev` — both map to `strapi develop`)
- In-container rebuild without deploy: `npm run build`

**All platform operations (start/stop/status/logs of the dev server, deploy, env / scaling / storage / domains) go through the Zerops development workflow via `zcp` MCP tools. Don't shell out to `zcli`.**

## Notes

- Strapi has no standalone migrate CLI — prod `initCommands` runs `bash migrate.sh` under `zsc execOnce`, which boots the app with `RUN_MIGRATIONS=true`, polls port 1337, and `SIGTERM`s the process once listening. `RUN_MIGRATIONS: false` in prod env ensures migrations never run during normal boots.
- For remote dev via SSH, rename `src/admin/vite.config.example.ts` to `vite.config.ts` and set `server.allowedHosts: true` so the admin panel accepts the Zerops subdomain.
