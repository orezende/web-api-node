const express = require('express');

const routes = express.Router();

routes.get('/index', (req, res) => {
  res.status(200).send();
});

module.exports = routes;
