const express = require('express');

const app = express();
app.use(express.json());

// Permissive CORS so browser-based integrations can hit the demo endpoints.
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type, X-Request-Id');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ name: 'tps-demo', status: 'ok' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Echoes back whatever is sent — handy for verifying integrations end to end.
app.post('/echo', (req, res) => {
  res.json({ received: req.body, headers: req.headers });
});

app.listen(PORT, () => {
  console.log(`tps-demo listening on port ${PORT}`);
});
