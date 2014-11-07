/**
 * The Signatures API facet.
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
var Signatures = function(baseURI, requestProxy) {
  APIFacet.call(this, baseURI.segment('signatures'), requestProxy);
};

util.inherits(Signatures, APIFacet);


/**
 * Signs a petition on behalf of a user.
 *
 * @param signature The signature object, containing details of the user and petition to sign.
 * @param success
 * @param failure
 */
Signatures.prototype.signPetition = function(signature, success, failure) {
  this.post(this.getAuthenticatedURI(), signature, success, failure);
};


module.exports = Signatures;
