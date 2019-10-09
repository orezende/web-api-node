module.exports = function ValidationError(message) {
  this.name = 'Houve um erro no sistema, por favor contate o administrador';
  this.message = message;
};
