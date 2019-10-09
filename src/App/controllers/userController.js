const userService = require('../services/userService');

module.exports = {
  async index(req, res) {
    const users = await userService.findAll();
    return res.send(users);
  },
  async store(req, res) {
    try {
      const result = await userService.store(req.body);
      return res.status(201).json(result);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
};
