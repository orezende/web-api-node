
exports.up = (knex) => knex.schema.table('users', (table) => {
  table.unique('mail');
});


exports.down = (knex) => knex.schema.table('users', (table) => {
  table.dropUnique('users_mail_unique');
});
