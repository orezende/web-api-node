const req = require('supertest');
const app = require('../../src/app');
const userService = require('../../src/app/services/userService');
const accountService = require('../../src/app/services/accountsService');

const MAIN_ROUTE = '/accounts';
const mail = `${Date.now()}@mail.com`;
let user;
let account;

beforeAll(async () => {
  const currentUser = await userService.store({ name: Date.now(), mail, passwd: Date.now() });
  user = { ...currentUser[0] };

  const currentAccount = await accountService.store({ name: user.name, user_id: user.id });
  account = { ...currentAccount[0] };
});

test('Deve inserir uma conta com sucesso', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ name: user.name, user_id: user.id });

  expect(res.status).toBe(201);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].name).toBe(user.name);
});

test('Não deve permitir inserir uma conta sem nome', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ user_id: user.id });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Não é possível inserir uma conta sem nome');
});

test('Não deve permitir inserir uma conta sem id', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ name: user.name });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('Não é possível inserir uma conta sem vinculo de usuário');
});

test('Deve listar todos os usuários', async () => {
  const res = await req(app).get(MAIN_ROUTE);

  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
});

test('Deve listar uma conta pelo id do mesmo', async () => {
  const res = await req(app).get(`${MAIN_ROUTE}?id=${account.id}`);

  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].id).toBe(account.id);
});

test('Deve alterar uma conta passando o id do mesmo', async () => {
  const nameToUp = `${Date.now()}`;

  const res = await req(app).put(`${MAIN_ROUTE}?id=${account.id}`)
    .send({ name: nameToUp });

  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0].name).toBe(nameToUp);
  expect(res.body[0].id).toBe(account.id);
});

test('Deve excluir uma conta passando o id do mesmo', async () => {
  const res = await req(app).delete(`${MAIN_ROUTE}?id=${account.id}`);

  expect(res.status).toBe(200);
  expect(res.body.warning).toBe('Conta excluida com sucesso');
  expect(res.body.accDeleted.length).toBeGreaterThan(0);
  expect(res.body.accDeleted[0].id).toBe(account.id);
});
