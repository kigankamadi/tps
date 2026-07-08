const express = require('express');

const app = express();
app.use(express.json());

// In-memory request counters, keyed by "METHOD /path".
const requestCounts = {};
app.use((req, res, next) => {
  const key = `${req.method} ${req.path}`;
  requestCounts[key] = (requestCounts[key] || 0) + 1;
  next();
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ name: 'tps-demo', status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

app.get('/metrics', (req, res) => {
  res.json({ uptime: process.uptime(), requests: requestCounts });
});

// Echoes back whatever is sent — handy for verifying integrations end to end.
app.post('/echo', (req, res) => {
  res.json({ received: req.body, headers: req.headers });
});

app.listen(PORT, () => {
  console.log(`tps-demo listening on port ${PORT}`);
});
