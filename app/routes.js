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

/**
 * Feed
 */
routes.get('/feed', controllers.userController.feed);

/**
 * Friendship
 */
routes.get('/friends/', controllers.friendshipController.list);
routes.post('/friend/request/:id', controllers.friendshipController.request);
routes.delete('/friend/unrequest/:id', controllers.friendshipController.unrequest);
routes.post('/friend/accept/:id', controllers.friendshipController.accept);
routes.delete('/friend/reject/:id', controllers.friendshipController.reject);
routes.delete('/unfriend/:id', controllers.friendshipController.unfriend);

module.exports = routes;
