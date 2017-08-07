//Stub code
var bcrypt = require('bcryptjs');
var db = require('../db');

var User = {
	findOne: function(email, done) {
		db.get().query('SELECT * FROM users WHERE email = ?', email, function(err, result) {
		    if (err) {
				return done(err);
		    }

		    done(null, result);
		  })
	},

	create: function(user, done) {
		newUser = [];
		for(key in user) {
    if(user.hasOwnProperty(key)) {
        var value = user[key];
        newUser.push(value);
    }
}
		console.log(newUser);
		db.get().query('INSERT INTO users (email, password, first_name, last_name, city, locale) VALUES(?, ?, ?, ?, ?, ?)', newUser, function(err, result) {
			if (err) {
				console.log('db error: ' + err);
				return done(err);
			}
    		done(null, result.insertId);
		})
	}
};

module.exports = User;

