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
		user = Object.values(user);
		db.get().query('INSERT INTO users (email, password, first_name, last_name, city, locale) VALUES(?, ?, ?, ?, ?, ?)', user, function(err, result) {
			if (err) {
				return done(err);
			}
    		done(null, result.insertId);
		})
	}
};

module.exports = User;

