var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var users = require('./users.js');
 


/*
 * Routes for authentication and authorization
 */
router.use('/auth', auth);

/*
 * Routes that can be accessed by any one
 */

 // @todo Remove this route - used as test
router.get('/', function(req, res) {
	res.json({'helloWorld': 'helloWorld'});
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
router.use('/users', users);

 
module.exports = router;