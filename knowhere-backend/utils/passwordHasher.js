var bcrypt = require('bcryptjs');

exports.hashSaltPassword = function(password, cb) {
	bcrypt.hash(password, 8, function(err, hash) {
		if (err)
			return cb(err, null);
		return cb(null, hash);
	});
};

exports.checkPassword = function(password, passwordHash) {
	bcrypt.compare(password, passwordHash, function(err, res) {
		return res ? res : err;
	});
}
