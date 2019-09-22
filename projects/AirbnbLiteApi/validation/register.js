const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = 'User name is required';
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = 'User email is required';
  }
  else if (!Validator.isEmail(data.email)) {
    errors.email = 'Email is invalid'
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = 'User password is required';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'Please confirm password';
  }
  if (!Validator.isLength(data.password, { min : 8, max : 20 })) {
    errors.password = 'Password must be at least 8 characters';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = 'Passwords must match';
  }

  return {
    errors, isValid : isEmpty(errors)
  };
};