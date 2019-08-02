function showLoginForm(request, response) {
  return response.status(200).type('html').render('login');
}

function login(request, response) {
  return response.status(200).type('html').render('home');
}

module.exports.showLoginForm = showLoginForm;
module.exports.login = login;
