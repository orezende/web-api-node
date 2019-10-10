module.exports = function ValidationError(message) {
  this.name = 'Internal Error';
  this.message = message;
};
