async function getAuthUser(request, response) {
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
      error: error,
      message: message
    });
  }
}

async function getUsers(request, response) {
  try {
    return response.status(200).json({
      id: '1234',
      email: 'user@example.com',
      password: 'password'
    });
  } catch (error) {
    var message = error.message;
    return response.status(500).json({
      error: error,
      message: message
    });
  }
}

async function findUser(request, response) {
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
      error: error,
      message: message
    });
  }
}

exports.getAuthUser = getAuthUser;
exports.getUsers = getUsers;
exports.findUser = findUser;
