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
 * Avatar
 */
routes.post('/avatar', controllers.avatarController.create);
routes.put('/avatar/:id', controllers.avatarController.update);
routes.delete('/avatar/:id', controllers.avatarController.destroy);

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
 * Profile
 */
routes.post('/profile', controllers.userController.profile);

/**
 * Friendship
 */
routes.get('/friends/list', controllers.friendshipController.list);
routes.get('/friends/requests', controllers.friendshipController.listRequests);
routes.post('/friends/request/:id', controllers.friendshipController.request);
routes.delete('/friends/unrequest/:id', controllers.friendshipController.unrequest);
routes.post('/friends/accept/:id', controllers.friendshipController.accept);
routes.delete('/friends/reject/:id', controllers.friendshipController.reject);
routes.delete('/unfriend/:id', controllers.friendshipController.unfriend);

module.exports = routes;
