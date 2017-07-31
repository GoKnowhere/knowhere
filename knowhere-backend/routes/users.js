var router = require('express').Router();
var users = require('../controllers/users');

router.post('/api/v1/admin/users/', users.create);
router.get('/api/v1/admin/users', users.getAll);

// @todo Create these methods and uncomment
// router.get('/api/v1/admin/users/:id', users.getOne);
// router.put('/api/v1/admin/users/:id', users.update);
// router.delete('/api/v1/admin/users/:id', users.delete);

module.exports = router;
