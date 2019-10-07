const req = require('supertest');
const app = require('../src/app');

test('Deve responder na raiz', async () => {
  const response = await req(app).get('/');
  expect(response.status).toBe(200);
});
