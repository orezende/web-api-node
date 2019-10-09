const knex = require('knex');
const knexFile = require('../../../knexfile');
const ValidationError = require('../exception/ValidationError');

const dataBase = knex(knexFile.test);

module.exports = {
  async store(account) {
    if (!account.name) throw new ValidationError('Não é possível inserir uma conta sem nome');

    if (!account.user_id) throw new ValidationError('Não é possível inserir uma conta sem vinculo de usuário');

    return dataBase('accounts').insert(account, '*');
  },
  async list(filter = {}) {
    return dataBase('accounts').where(filter).select();
  },
  async update(id, account) {
    return dataBase('accounts').where({ id }).update({ name: account.name }, '*');
  },
  async delete(id) {
    return dataBase('accounts').where({ id }).delete('*');
  },
};
