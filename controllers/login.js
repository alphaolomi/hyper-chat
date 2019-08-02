function showLoginForm(request, response) {
  return response.status(200).type('html').render('login');
}

function login(request, response) {
  return response.status(200).type('html').render('home');
}

exports.showLoginForm = showLoginForm;
exports.login = login;