# tps-demo

Minimal public demo app used for integration testing.

## Run

```bash
npm install
npm start
```

The server listens on `PORT` (default `3000`).

## Endpoints

- `GET /` — basic info
- `GET /health` — health check with uptime
- `POST /echo` — echoes back the JSON body and request headers
