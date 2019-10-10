const accountService = require('../services/accountsService');

module.exports = {
  async store(req, res, next) {
    try {
      const response = await accountService.store(req.body);
      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  },
  // TODO melhorar esse metodo
  async list(req, res, next) {
    try {
      if (req.query.id) {
        return res.json(await accountService.list({ id: req.query.id }));
      }
      return res.json(await accountService.list());
    } catch (err) {
      return next(err);
    }
  },
  async update(req, res, next) {
    try {
      res.json(await accountService.update(req.query.id, req.body));
    } catch (err) {
      next(err);
    }
  },
  async delete(req, res, next) {
    try {
      const accDeleted = await accountService.delete(req.query.id);
      res.json({ accDeleted, warning: 'Conta excluida com sucesso' });
    } catch (err) {
      next(err);
    }
  },
};
