const User = require('../models/user');

async function showRegistrationForm(request, response) {
  return response
    .status(200)
    .type('html')
    .render('register');
}

async function registerUser(request, response, next) {
  try {
    const user = await User.create(request.body);
    return response.redirect('/home');
  } catch (error) {
    next({ status: 500, message: error.message });
  }
}

module.exports.showRegistrationForm = showRegistrationForm;
module.exports.registerUser = registerUser;
