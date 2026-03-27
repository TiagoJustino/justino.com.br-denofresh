# justino.com.br

Personal website built with [Deno Fresh](https://fresh.deno.dev/) 1.7, deployed on [Railway](https://railway.com/) via Docker.

## Stack

- **Runtime:** Deno 2.x
- **Framework:** Fresh 1.7 (Preact + Islands architecture)
- **Styling:** Twind (Tailwind-in-JS)
- **Hosting:** Railway (Dockerfile builder)
- **DNS/CDN:** Cloudflare (proxied)

## Domains

| URL | Behaviour |
|-----|-----------|
| https://justino.com.br | Primary (Railway) |
| https://tiago.justino.com.br | Alias (Railway) |
| https://www.justino.com.br | 301 redirect to apex (Cloudflare) |
| https://www.tiago.justino.com.br | 301 redirect to tiago subdomain (Cloudflare) |

HTTP requests are automatically redirected to HTTPS via Cloudflare "Always Use HTTPS".

## Development

Install [Deno](https://docs.deno.com/runtime/getting_started/installation/):

```bash
curl -fsSL https://deno.land/install.sh | sh
```

Start the dev server (watches for changes):

```bash
deno task start
```

Build production assets:

```bash
deno task build
```

Preview production build locally:

```bash
deno task preview
```

## Deployment

Pushes to `main` trigger an automatic deploy on Railway via the project's Dockerfile.

To deploy manually from the CLI:

```bash
railway up -m "description of changes"
```
