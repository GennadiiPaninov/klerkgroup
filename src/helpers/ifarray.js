// Сhecking that the variable is an array
module.exports = function(value, options) {
  if (Array.isArray(value)) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
