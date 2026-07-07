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

app.listen(PORT, () => {
  console.log(`tps-demo listening on port ${PORT}`);
});
