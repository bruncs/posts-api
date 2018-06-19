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
routes.post('/posts', controllers.postController.create);
routes.delete('/posts/:id', controllers.postController.destroy);

/**
 * Like
 */
routes.post('/like/:id', controllers.likeController.toggle);

/**
 * Comment
 */
routes.post('/comments/:id', controllers.commentController.create);
routes.delete('/comments/:id', controllers.commentController.destroy);

module.exports = routes;
