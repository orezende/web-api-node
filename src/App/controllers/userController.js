const userService = require('../services/userService');

module.exports = {
  async index(req, res, next) {
    try {
      const users = await userService.findAll();
      res.send(users);
    } catch (err) {
      next(err);
    }
  },
  async store(req, res, next) {
    try {
      const result = await userService.store(req.body);
      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  },
};
