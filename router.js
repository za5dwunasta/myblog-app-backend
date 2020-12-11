const apiRouter = require('express').Router();
const userController = require('./controllers/userController');
const postController = require('./controllers/postController');
const followController = require('./controllers/followController');
const cors = require('cors');

apiRouter.use(cors());

apiRouter.get('/', (req, res) => res.json('Hello there, backend is working!'));

apiRouter.post('/checkToken', userController.checkToken);

apiRouter.post('/getHomeFeed', userController.apiMustBeLoggedIn, userController.apiGetHomeFeed);
apiRouter.post('/register', userController.apiRegister);
apiRouter.post('/login', userController.apiLogin);
apiRouter.get('/post/:id', postController.reactApiViewSingle);
apiRouter.post('/post/:id/edit', userController.apiMustBeLoggedIn, postController.apiUpdate);
apiRouter.delete('/post/:id', userController.apiMustBeLoggedIn, postController.apiDelete);
apiRouter.post('/create-post', userController.apiMustBeLoggedIn, postController.apiCreate);
apiRouter.post('/search', postController.search);

apiRouter.post('/doesUsernameExist', userController.doesUsernameExist);
apiRouter.post('/doesEmailExist', userController.doesEmailExist);

apiRouter.post(
	'/profile/:username',
	userController.ifUserExists,
	userController.sharedProfileData,
	userController.profileBasicData
);
apiRouter.get('/profile/:username/posts', userController.ifUserExists, userController.apiGetPostsByUsername);
apiRouter.get('/profile/:username/followers', userController.ifUserExists, userController.profileFollowers);
apiRouter.get('/profile/:username/following', userController.ifUserExists, userController.profileFollowing);

apiRouter.post('/addFollow/:username', userController.apiMustBeLoggedIn, followController.apiAddFollow);
apiRouter.post('/removeFollow/:username', userController.apiMustBeLoggedIn, followController.apiRemoveFollow);

module.exports = apiRouter;
