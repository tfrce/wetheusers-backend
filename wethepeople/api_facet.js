/**
 * Base class for all API facets used in the We the People API.
 * @constructor
 */

var events = require('events');
var util = require('util');


var APIFacet = function(baseURI, requestProxy) {
  events.EventEmitter.call(this);

  /**
   * The base URI object for this facet, e.g. http://{api_url}/{version}/{collection_name}
   * @type {Object}
   * @private
   */
  this.baseURI_ = baseURI;

  /**
   * Proxy object, used to queue and rate limit requests.
   * @type {*}
   */
  this.requestProxy = requestProxy;
};

util.inherits(APIFacet, events.EventEmitter);


/**
 * Clones the URI for the facet's base URL.
 * @returns {Object}
 */
APIFacet.prototype.getURI = function() {
  return this.baseURI_.clone();
};


/**
 * Clones the URI for the facet's base URL and sets the API Key in the query params.
 * @returns {Object}
 */
APIFacet.prototype.getAuthenticatedURI = function() {
  return this.baseURI_.clone().addQuery('api_key', this.requestProxy.apiKey);
};


// Helper methods for standard HTTP verbs


APIFacet.prototype.get = function(uri, success, failure) {
  this.requestProxy.makeRequest('GET', uri, null, success, failure);
};


APIFacet.prototype.post = function(uri, params, success, failure) {
  this.requestProxy.makeRequest('POST', uri, params, success, failure);
};


APIFacet.prototype.put = function() {
  this.requestProxy.makeRequest('PUT');
};


APIFacet.prototype.delete = function() {
  this.requestProxy.makeRequest('DELETE');
};


module.exports = APIFacet;
