const express = require('express');

const app = express();
app.use(express.json());

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

module.exports = app;
