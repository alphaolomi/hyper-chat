async function register(request, response) {
  try {
    var user = {
      id: '1234',
      email: 'user@example.com',
      password: 'password'
    };
    return response.status(200).json(user);
  } catch (error) {
    var message = error.message;
    return response.status(500).json({
      message: message,
      error: error
    });
  }
}

async function login(request, response) {
  try {
    var user = {
      id: '1234',
      email: 'user@example.com',
      password: 'password'
    };
    return response.status(200).json(user);
  } catch (error) {
    var message = error.message;
    return response.status(500).json({
      message: message,
      error: error
    });
  }
}

exports.register = register;
exports.login = login;