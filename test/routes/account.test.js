const req = require('supertest');
const app = require('../../src/app');
const userService = require('../../src/app/services/userService');

const MAIN_ROUTE = '/accounts';
const mail = `${Date.now()}@mail.com`;
let user;

beforeAll(async () => {
  const res = await userService.store({ name: 'User ', mail, passwd: '1234567' });
  user = { ...res[0] };
});

test('Deve listar todas as contas', async () => {
  const res = await req(app).get(MAIN_ROUTE);

  expect(res.status).toBe(200);
  expect(res.body.lenght).toBeGreaterThan(0);
});

test('Deve inserir um usuário com sucesso', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ name: user.name, user_id: user.id });

  expect(res.status).toBe(200);
  expect(res.body.lenght).toBeGreaterThan(0);
  expect(res.body.name).toBe(user.name);
});

test('Deve me retortar um usuário por id', async () => {
  const res = await req(app).get(`${MAIN_ROUTE}/${user.id}`);
  expect(res.status).toBe(200);
  expect(res.body.name).toEqual(user.name);
});

test('Não deve inserir um usuário sem nome', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ user_id: user.id });

  expect(res.status).toBe(400);
  expect(res.body.error).toEqual('Por favor, insira um nome para o usuário');
});
