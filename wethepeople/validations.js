/**
 * The Validations API facet.
 *
 * @constructor
 */

var path = require('path');
var util = require('util');

var APIFacet = require('./api_facet');


/**
 * @constructor
 * @extends {APIFacet}
 */
var Validations = function(baseURI, requestProxy) {
  APIFacet.call(this, baseURI.segment('validations'), requestProxy);
};

util.inherits(Validations, APIFacet);


/**
 *
 * @param query
 * @param success
 * @param failure
 */
Validations.prototype.getValidations = function(query, success, failure) {
  var uri = this.getAuthenticatedURI().segment(1, 'validations.json');
  this.get(uri, success, failure);
};


module.exports = Validations;
