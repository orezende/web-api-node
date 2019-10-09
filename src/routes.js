const express = require('express');
const IndexController = require('./App/controllers/indexController');
const UserController = require('./App/controllers/userController');
const AccountController = require('./app/controllers/accountsController');

const routes = express.Router();
// INDEX
routes.get('/', IndexController.index);
// USERS
routes.get('/users', UserController.index);
routes.post('/users', UserController.store);
// ACCOUNTS
routes.post('/accounts', AccountController.store);
routes.get('/accounts', AccountController.list);
routes.put('/accounts', AccountController.update);
routes.delete('/accounts', AccountController.delete);

module.exports = routes;
