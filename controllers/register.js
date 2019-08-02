var user = require("../user");

async function showRegistrationForm(request, response) {
  return response.status(200).type('html').render('register');
}

async function registerUser(request, response, next) {
  try {
    await user.create(request.body);
    return response.redirect('/home');
  } catch (error) {
    next({ status: 500, message: error.message });
  }
}

exports.showRegistrationForm = showRegistrationForm;
exports.registerUser = registerUser;
