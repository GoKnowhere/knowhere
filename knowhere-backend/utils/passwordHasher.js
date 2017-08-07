var bcrypt = require('bcryptjs');

exports.hashSaltPassword = function(password) {
	console.log('password: ' + password);
	var hashPassword = bcrypt.hashSync(password, 10);
	console.log('hashPassword: ' + hashPassword);
	return hashPassword;
};

exports.checkPassword = function(password, passwordHash) {
	return bcrypt.compareSync(password, passwordHash);
}
