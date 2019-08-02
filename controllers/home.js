async function welcome(request, response, next) {
    try {
        return response.status(200).type('html').render('welcome');
    } catch (error) {
        next(error);
    }
}


async function index(request, response, next) {
    try {
        return response.status(200).type('html').render('index', {title: 'Express'});
    } catch (error) {
        next(error);
    }
}


async function show(request, response) {
    try {
        const user = {
            id: '1234',
            email: 'user@example.com',
            password: 'password'
        };
        return response.status(200).type('html').render('home', user);
    } catch (error) {
        return response.status(500).json(error);
    }
}


module.exports.show = show;
module.exports.welcome = welcome;
module.exports.index = index;

