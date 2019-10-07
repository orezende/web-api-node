const express = require('express');
const IndexController = require('./App/controllers/indexController');
const UserController = require('./App/controllers/userController');

const routes = express.Router();

routes.get('/', IndexController.index);

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
module.exports = routes;
