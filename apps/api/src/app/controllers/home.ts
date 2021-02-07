import { Response, Request, NextFunction } from 'express';

/**
 *
 * @param request
 * @param response
 * @param next
 */
async function welcome(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    return response.status(200).type('html').render('welcome');
  } catch (error) {
    next(error);
  }
}
/**
 *
 * @param request
 * @param response
 * @param next
 */
async function index(request: Request, response: Response, next: NextFunction) {
  try {
    return response
      .status(200)
      .type('html')
      .render('index', { title: 'HyperChat' });
  } catch (error) {
    next(error);
  }
}

async function show(request: Response, response: Response) {
  try {
    const user = {
      id: '1234',
      email: 'user@example.com',
      password: 'password',
    };
    return response.status(200).type('html').render('home', user);
  } catch (error) {
    return response.status(500).json(error);
  }
}

export default {
  show,
  welcome,
  index,
};
