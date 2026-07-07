const express = require('express');

const app = express();
app.use(express.json());

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

const server = app.listen(PORT, () => {
  console.log(`tps-demo listening on port ${PORT}`);
});

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => {
    console.log(`${signal} received, shutting down`);
    server.close(() => process.exit(0));
  });
}
