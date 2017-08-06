var bcrypt = require('bcryptjs');

exports hashSaltPassword = function(password) {
	bcrypt.hash(password, 8, function(err, hash) {
		return hash === true ? hash : false;	
	});
};

exports checkPassword = function(password, passwordHash) {
	bcrypt.compare(password, passwordHash, function(err, res) {
		return res ? res : err;
	});
}
