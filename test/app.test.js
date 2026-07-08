const { test, before, after } = require('node:test');
const assert = require('node:assert');
const app = require('../app');

let server;
let baseUrl;

before(() => {
  return new Promise((resolve) => {
    server = app.listen(0, () => {
      baseUrl = `http://127.0.0.1:${server.address().port}`;
      resolve();
    });
  });
});

after(() => server.close());

test('GET / returns app info', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { name: 'tps-demo', status: 'ok' });
});

test('GET /health reports healthy', async () => {
  const res = await fetch(`${baseUrl}/health`);
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.strictEqual(body.status, 'healthy');
  assert.ok(typeof body.uptime === 'number');
});

test('POST /echo returns the request body', async () => {
  const res = await fetch(`${baseUrl}/echo`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ hello: 'world' }),
  });
  const body = await res.json();
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(body.received, { hello: 'world' });
});
