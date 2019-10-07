const userService = require('../services/userService');

module.exports = {
  async index(req, res) {
    const users = await userService.findAll();
    return res.send(users);
  },
  async store(req, res) {
    const result = await userService.store(req.body);

    if (result.error) return res.status(400).json(result);
    return res.status(201).json(result);
  },
};
