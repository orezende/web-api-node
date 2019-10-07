const express = require('express');
const cors = require('cors');
const knex = require('knex');
const knexFile = require('../knexfile');
const routes = require('./routes');

// TODO criar chaveamento dinamico
const app = express();

app.db = knex(knexFile.test);

app.use(cors());
app.use(express.json());
app.use(routes);

module.exports = app;
