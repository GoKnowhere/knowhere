var User = require('../models/User');
 
  exports.getAll = function(req, res) {
    res.json('users': users);
  },
 
  // getOne: function(req, res) {
  //   var id = req.params.id;
  //   var user = data[0]; // Spoof a DB call
  //   res.json(user);
  // },
 
  exports.create = function(req, res) {
    res.json({'user': 'not-implemented'});
  };
 
  // update: function(req, res) {
  //   var updateuser = req.body;
  //   var id = req.params.id;
  //   data[id] = updateuser // Spoof a DB call
  //   res.json(updateuser);
  // },
 
  // delete: function(req, res) {
  //   var id = req.params.id;
  //   data.splice(id, 1) // Spoof a DB call
  //   res.json(true);
  // }