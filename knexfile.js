module.exports = {
  test: {
    client: 'pg',
    version: 9.6,
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'toor',
      database: 'web-api-node',
    },
    migrations: {
      directory: 'src/database/migrations',
    },
  },
};
