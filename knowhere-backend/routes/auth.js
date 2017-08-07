var router = require('express').Router();
var auth = require('../controllers/auth');
var passport = require('passport');
var passportHelper = require('../config/passport');

router.post('/login', auth.login);
router.post('/signup', auth.signup);
router.get('/signup', 
  function (req, res) {
    res.json({'hello': 'hello'});
  }
);

// GET /auth/instagram
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Instagram authentication will involve
//   redirecting the user to instagram.com.  After authorization, Instagram
//   will redirect the user back to this application at /auth/instagram/callback
router.get('/instagram',
  // auth.instagramAuth,
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
router.get('/instagram/callback',
  // auth.instagramCallback,
  function (req, res) {
    res.redirect('/');
  }
);
 
 // Facebook Auth Routes
 router.get('/login/facebook', 
  // auth.facebookAuth, 
  function (req, res) {
  //Rerouted automatically so never really called
 });

router.get('/login/facebook/return', 
  // auth.facebookCallBack,
  function(req, res) {
    //Send a response back as json
  });



// @todo Create these methods and uncomment
// router.get('/api/v1/admin/users/:id', users.getOne);
// router.put('/api/v1/admin/users/:id', users.update);
// router.delete('/api/v1/admin/users/:id', users.delete);

module.exports = router;
