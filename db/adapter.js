/**
 * Adapters for different datastore types.
 */

var lodash = require('lodash');
var redis = require('redis');
var url = require('url');

var config = require('config').get('REDIS');
var dbUtils = require('./utils');


var RedisAdapter = function() {
  var options = {
    max_attempts: config.get('MAX_ATTEMPTS')
  };

  var port, hostname;
  if (!lodash.isUndefined(process.env.REDISTOGO_URL)) {
    var rtgURI = url.parse(process.env.REDISTOGO_URL);
    port = rtgURI.port;
    hostname = rtgURI.hostname;
  } else {
    port = config.get('PORT');
    hostname = config.get('URL');
  }

  // TODO(leah): per https://github.com/mranney/node_redis/issues/226 connection pooling shouldn't
  //             be necessary for our use case, so manage a single conn instance.
  this.client = redis.createClient(port, hostname, options);
};


/**
 *
 *
 * @param signature
 * @param success
 * @param failure
 */
RedisAdapter.prototype.saveSignature = function(signature, success, failure) {
  var emailHash = dbUtils.hashEmail(signature.email);

  this.client.set(emailHash, JSON.stringify(signature), function(err, reply) {
    if (err) {
      failure(err);
    } else {
      success();
    }
  });
};


/**
 *
 *
 * @param email
 * @param success
 * @param failure
 */
RedisAdapter.prototype.getSignature = function(email, success, failure) {
  var emailHash = dbUtils.hashEmail(email);

  this.client.get(emailHash, function(err, reply) {
    if (err) {
      failure(err);
    } else {
      success(reply);
    }
  });
};


module.exports = new RedisAdapter();
