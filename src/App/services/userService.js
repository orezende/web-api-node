const knex = require('knex');
const knexFile = require('../../../knexfile');
const ValidationError = require('../exception/ValidationError');

const dataBase = knex(knexFile.test);

module.exports = {
  async findAll(filter = {}) {
    return dataBase('users').where(filter).select();
  },
  async store(user) {
    if (!user.name) throw new ValidationError('Por favor, preencha seu nome');
    if (!user.mail) throw new ValidationError('Por favor, preencha seu e-mail');
    if (!user.passwd) throw new ValidationError('Por favor, preencha sua senha');

    const userExists = await this.findAll({ mail: user.mail });

    if (userExists.length > 0) throw new ValidationError('E-mail já cadastrado');

    return dataBase('users').insert(user, '*');
  },
};
