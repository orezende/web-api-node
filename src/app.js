const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexFile = require('../knexfile');
const routes = require('./routes');
const error = require('./App/middleware/error');

// TODO criar chaveamento dinamico
const app = express();

app.db = knex(knexFile.test);

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(error);

module.exports = app;
