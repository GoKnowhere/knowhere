var mysql = require('mysql');
var async = require('async');

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'
exports.MODE_DEV = 'mode_dev'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, done) {
  state.pool = mysql.createPool(setDatabaseOptions(mode));

  state.mode = mode;
  done();
}

exports.get = function() {
  return state.pool;
}

exports.fixtures = function(data, done) {
  var pool = state.pool;

  if (!pool) return done(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, done)
}

exports.drop = function(tables, done) {
  var pool = state.pool
  if (!pool) return done(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, done)
}

function setDatabaseOptions(mode) {
  if (mode == exports.MODE_PRODUCTION) {
    return {
      host: process.env.PRODUCTION_DB_HOST,
      user: process.env.PRODUCTION_DB_USER,
      password: process.env.PRODUCTION_DB_PASS,
      database: process.env.PRODUCTION_DB
    };
  } else if (mode == exports.MODE_DEV) { 
    return {
      host: process.env.DEV_DB_HOST,
      user: process.env.DEV_DB_USER,
      password: process.env.DEV_DB_PASS,
      database: process.env.DEV_DB
    }; 
  }

  return {
      host: process.env.TEST_DB_HOST,
      user: process.env.TEST_DB_USER,
      password: process.env.TEST_DB_PASS,
      database: process.env.TEST_DB
    }; 
}
