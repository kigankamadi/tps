# tps-demo

Minimal public demo app used for integration testing.

## Run

```bash
npm install
npm start
```

The server listens on `PORT` (default `3000`).

## Endpoints

| Method | Path      | Description                                    |
| ------ | --------- | ---------------------------------------------- |
| GET    | `/`       | Basic info                                     |
| GET    | `/health` | Health check with uptime                       |
| POST   | `/echo`   | Echoes back the JSON body and request headers  |

## Examples

```bash
curl http://localhost:3000/health
curl -X POST http://localhost:3000/echo \
  -H 'Content-Type: application/json' \
  -d '{"hello": "world"}'
```

## Purpose

This repository is a public sandbox for exercising integrations: webhooks,
CI checks, review bots, and anything else that reacts to pushes, branches,
and pull requests.
