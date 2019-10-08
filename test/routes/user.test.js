const req = require('supertest');
const app = require('../../src/app');

const mail = `${Date.now()}@mail.com`;

const MAIN_ROUTE = '/users';

test('Deve listar todos os usuários', async () => {
  const res = await req(app).get(MAIN_ROUTE);

  expect(res.status).toBe(200);
  expect(res.body.length).toBeGreaterThan(0);
  expect(res.body[0]).toHaveProperty('name', 'João Vitor');
});

test('Deve inserir usuário com sucesso', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ name: 'João Vitor', mail, passwd: '1234567890' });

  expect(res.status).toBe(201);
  expect(res.body[0].mail).toBe(mail);
});

test('Não deve inserir usuário sem nome', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ mail, passwd: '1234567890' });

  expect(res.status).toBe(400);
  expect(res.body.error).toEqual('Por favor, preencha seu nome');
});

test('Não deve inserir usuário sem e-mail', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ name: 'João Vitor', passwd: '123456789' });

  expect(res.status).toBe(400);
  expect(res.body.error).toEqual('Por favor, preencha seu e-mail');
});

test('Não deve inserir usuário sem senha', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ name: 'João Vitor', mail });

  expect(res.status).toBe(400);
  expect(res.body.error).toEqual('Por favor, preencha sua senha');
});

test('Não deve inserir usuário com e-mail existente', async () => {
  const res = await req(app).post(MAIN_ROUTE)
    .send({ name: 'Jubileu', mail, passwd: '1234567890' });

  expect(res.status).toBe(400);
  expect(res.body.error).toBe('E-mail já cadastrado');
});
