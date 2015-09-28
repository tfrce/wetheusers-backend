/**
 * Adapters for different datastore types.
 */

var lodash = require('lodash');
var redis = require('redis');
var url = require('url');
var kue = require('kue')

var redisConfig = require('config').get('REDIS');
var dbUtils = require('./utils');


var RedisAdapter = function() {
  var options = {
    max_attempts: redisConfig.get('MAX_ATTEMPTS')
  };

  var port, hostname;
  if (process.env.NODE_ENV === 'production') {
    var redisURI = url.parse(redisConfig.get('REDIS_URI'));
    port = redisURI.port;
    hostname = redisURI.hostname;
  } else {
    port = redisConfig.get('PORT');
    hostname = redisConfig.get('URL');
  }


  // TODO(leah): per https://github.com/mranney/node_redis/issues/226 connection pooling shouldn't
  //             be necessary for our use case, so manage a single conn instance.
  /**
   * The underlying Redis client connection.
   * @type {*}
   * @private
   */
  this.client_ = redis.createClient(port, hostname, options);

  /**
   * The Kue job queue used to send tasks to the daemon.
   * @type {Queue}
   */
  this.jobQueue = kue.createQueue({
    redis: { port: port, host: hostname }
  });
};


/**
 * Saves the supplied signature object.
 *
 * @param signature
 * @param success
 * @param failure
 */
RedisAdapter.prototype.saveSignature = function(signature, success, failure) {
  var emailHash = dbUtils.hashEmail(signature.email);

  this.client_.set(emailHash, JSON.stringify(signature), function(err, reply) {
    if (err) {
      failure(err);
    } else {
      success();
    }
  });
};


/**
 * Fetches a signature object for the supplied email address.
 *
 * @param email
 * @param success
 * @param failure
 */
RedisAdapter.prototype.getSignature = function(email, success, failure) {
  var emailHash = dbUtils.hashEmail(email);

  this.client_.get(emailHash, function(err, reply) {
    if (err) {
      failure(err);
    } else {
      success(JSON.parse(reply));
    }
  });
};


module.exports = new RedisAdapter();
