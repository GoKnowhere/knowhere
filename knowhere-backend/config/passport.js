module.exports = function(app, passport) {
var passport = require('passport');
var FbStrategy = require('passport-facebook').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var LocalStrategy    = require('passport-local').Strategy;
var User = require('../models/User');
var auth = ('../controllers/auth');



// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new FbStrategy({
    clientID: app.get('FB_CLIENT_ID'),
    clientSecret: app.get('FB_CLIENT_SECRET'),
    callbackURL: 'http://localhost:3000/login/facebook/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, profile);
  }));

// Use the InstagramStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Instagram
//   profile), and invoke a callback with a user object.
passport.use(new InstagramStrategy({
    clientID: app.get('IG_CLIENT_ID'),
    clientSecret: app.get('IG_CLIENT_SECRET'),
    callbackURL: "http://localhost:3000/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Instagram profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Instagram account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));


// =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, {'loginMessage': 'No user found.'});

                if (!user.validPassword(password))
                    return done(null, false, {'loginMessage': 'Oops! Wrong password.'});

                // all is well, return user
                else
                    return done(null, user);
            });
        });

    }));

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
        process.nextTick(function() {
            // if the user is not already logged in:
            if (!req.user) {
                User.findOne({ 'email' :  email }, function(err, user) {
                    // if there are any errors, return the error
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (user) {
                      return done(null, false, {'error': 'Email is already talken'});
                    } else {

                      var hash = auth.hashPassword(req.body.password);
                      var today = new Date();

                      // create the user
                      var newUser={
                          "first_name":req.body.first_name,
                          "last_name": req.body.last_name,
                          "email":req.body.email,
                          "city": req.body.city,
                          "locale": req.body.locale,
                          "password":hash,
                          "created_at":today,
                          "updated_at":today
                      }

                      User.create(newUser, function(err) {
                          if (err)
                              return done(err);

                          return done(null, newUser);
                      });
                  }

                });
            // if the user is logged in but has no local account...
            } else if ( !req.user.email ) {
                // ...presumably they're trying to connect a local account
                // BUT let's check if the email used to connect a local account is being used by another user
                User.findOne({ 'email' :  email }, function(err, user) {
                    if (err) {
                      return done(err);
                    }
                    
                    if (user) {
                        return done(null, false, {'error': 'That email is already taken.'});
                        // Using 'loginMessage instead of signupMessage because it's used by /connect/local'
                    } else {
                        
                      var hash = auth.hashPassword(req.body.password);
                      var today = new Date();

                        // create the user
                        var newUser={
                            "first_name":req.body.first_name,
                            "last_name": req.body.last_name,
                            "email":req.body.email,
                            "city": req.body.city,
                            "locale": req.body.locale,
                            "password":hash,
                            "created_at":today,
                            "updated_at":today
                        }

                        User.create(newUser, function(err) {
                            if (err)
                                return done(err);

                            return done(null, newUser);
                        });
                    }
                });
            } else {
                // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
                return done(null, req.user);
            }

        });

    }));




// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

};