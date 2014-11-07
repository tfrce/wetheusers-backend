/**
 * Proxy object for sending API requests, supports request queueing and throttling.
 * @constructor
 */

var events = require('events');
var lodash = require('lodash');
var request = require('request');


var RequestProxy = function(apiKey, maxRequestsPerMinute) {
  events.EventEmitter.call(this);

  /**
   * The API key for communicating with the WTP servers.
   * @type {string}
   */
  this.apiKey = apiKey;

  /**
   * The max number of requests to send per minute.
   * @type {number}
   */
  this.maxRequestsPerMinute = maxRequestsPerMinute;
};


/**
 * Makes a request to the remote endpoint.
 * @param method
 * @param uri
 * @param success
 * @param failure
 */
RequestProxy.prototype.makeRequest = function(method, uri, params, success, error) {

  // TODO(leah): Implement queueing and rate limiting, see:
  //   * https://github.com/jhurliman/node-rate-limiter
  //   * https://github.com/chilts/oibackoff
  //   * https://github.com/caolan/async#queue

  var options = {
    uri: uri.toString(),
    method: method
  };

  if (params !== null) {
    options.json = params;
  }

  if (lodash.isUndefined(error)) {
    error = function(err) {
      console.log(err);
    };
  }

  request(options, function(err, response, body) {
    var statusCode = response.statusCode;
    if (!err && (statusCode >= 200 && statusCode <= 299)) {
      success(JSON.parse(body));
    } else {
      error(err);
    }
  });
};


module.exports = RequestProxy;
