const express = require('express');
const requireDir = require('require-dir');

const routes = express.Router();

const controllers = requireDir('./controllers');
const authMiddleware = require('./middlewares/auth');

/**
 * Auth
 */
routes.post('/signup', controllers.authController.signup);
routes.post('/signin', controllers.authController.signin);

routes.use(authMiddleware);

/**
 * Post
 */
routes.post('/post', controllers.postController.create);

module.exports = routes;
