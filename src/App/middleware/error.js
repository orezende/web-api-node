module.exports = (err, req, res, next) => {
  const { name, message, stack } = err;
  if (name === 'Internal Error') res.status(400).json({ error: message });
  else res.status(500).json({ name, message, stack });
  next(err);
};
