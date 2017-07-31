var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var users = require('./users.js');
var passport = require('passport');
 
/*
 * Routes that can be accessed by any one
 */

 // @todo Remove this route - used as test
router.get('/', function(req, res) {
	res.json({'helloWorld': 'helloWorld'});
});

router.post('/login', auth.login);
router.post('/signup', auth.signup);

// GET /auth/instagram
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Instagram authentication will involve
//   redirecting the user to instagram.com.  After authorization, Instagram
//   will redirect the user back to this application at /auth/instagram/callback
router.get('/auth/instagram',
	passport.authenticate('instagram'),
	function (req, res) {
	    // The request will be redirected to Instagram for authentication, so this
	    // function will not be called.
	}
);

// GET /auth/instagram/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/instagram/callback',
	passport.authenticate('instagram', { failureRedirect: '/login' }),
	function (req, res) {
		res.redirect('/');
	}
);
 
 // Facebook Auth Routes
 router.get('/login/facebook', passport.authenticate('facebook'));

router.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    //Send a response back as json
  });

/*
 * Routes that can be accessed only by autheticated users
 */

// router.get('/api/v1/products', products.getAll);
// router.get('/api/v1/product/:id', products.getOne);
// router.post('/api/v1/product/', products.create);
// router.put('/api/v1/product/:id', products.update);
// router.delete('/api/v1/product/:id', products.delete);
 
/*
 * Routes that can be accessed only by authenticated & authorized users
 */
router.use('/api/v1/admin/users', users);
 
module.exports = router;