const knex = require('knex');
const knexFile = require('../../../knexfile');

const dataBase = knex(knexFile.test);

module.exports = {
  async findAll(filter = {}) {
    return dataBase('users').where(filter).select();
  },
  async store(user) {
    if (!user.name) return { error: 'Por favor, preencha seu nome' };
    if (!user.mail) return { error: 'Por favor, preencha seu e-mail' };
    if (!user.passwd) return { error: 'Por favor, preencha sua senha' };

    const userExists = await this.findAll({ mail: user.mail });

    if (userExists.length > 0) return { error: 'E-mail já cadastrado' };

    return dataBase('users').insert(user, '*');
  },
};
