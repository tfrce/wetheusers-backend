/**
 * Proxy object for sending API requests, supports request queueing and throttling.
 * @constructor
 */

var events = require('events');
var limiter = require('limiter');
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
   * Rate limiter to manage throttling API requests to the WtP API.
   *
   * NOTE: There's no persistence guarantee for requests, if the process using this connection goes
   * down, queued requests will be lost.
   *
   * @type {*}
   * @private
   */
  this.limiter_ = new limiter.RateLimiter(maxRequestsPerMinute, 'minute');

};


/**
 * Makes a request to the remote endpoint.
 * @param method
 * @param uri
 * @param success
 * @param error
 */
RequestProxy.prototype.makeRequest = function(method, uri, params, success, error) {
  var requestArgs = this.getRequestArgs_(method, uri, params, success, error);
  this.executeRequest_.apply(this, requestArgs);
};


/**
 * Makes a cleaned up array of request arguments for the request module to consume.
 *
 * @param method
 * @param uri
 * @param params
 * @param success
 * @param error
 * @returns {Array}
 * @private
 */
RequestProxy.prototype.getRequestArgs_ = function(method, uri, params, success, error) {
  var options = {
    uri: uri.toString(),
    method: method
  };

  if (params !== null) {
    options.body = params;
    options.json = params;
  }

  // Ignore the error by default
  var error = !lodash.isUndefined(error) ? error : function(err) {};
  var success = !lodash.isUndefined(success) ? success : function() {};

  return [options, success, error];
};


/**
 * Internal method to execute a request.
 * @private
 */
RequestProxy.prototype.executeRequest_ = function(options, success, error) {

  this.limiter_.removeTokens(1, function(err, remainingRequests) {
    if (err) {
      error(err);
    } else {

      var requestCallback = function(err, response, body) {
        var statusCode = response.statusCode;
        if (!err && (statusCode >= 200 && statusCode <= 299)) {
          // For some reason the response from a signatures POST isn't JSON, so check before parsing
          var responseBody = lodash.isString(body) ? JSON.parse(body) : body;
          success(responseBody);
        } else {
          error(err);
        }
      };

      request(options, requestCallback);

    }
  });
};


module.exports = RequestProxy;
