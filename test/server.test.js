const superTest = require('supertest');

const request = superTest('http://localhost:3001');

test('Deve responder na porta 3001', async () => {
  const response = await request.get('/');
  expect(response.status).toBe(201);
});
