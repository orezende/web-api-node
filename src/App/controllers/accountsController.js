const accountService = require('../services/accountsService');

module.exports = {
  async store(req, res) {
    try {
      const response = await accountService.store(req.body);
      return res.status(201).json(response);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  },
  async list(req, res) {
    if (req.query.id) {
      return res.json(await accountService.list({ id: req.query.id }));
    }
    return res.json(await accountService.list());
  },
  async update(req, res) {
    return res.json(await accountService.update(req.query.id, req.body));
  },
  async delete(req, res) {
    const accDeleted = await accountService.delete(req.query.id);
    return res.json({ accDeleted, warning: 'Conta excluida com sucesso' });
  },
};
