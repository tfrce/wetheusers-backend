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
  var uri = this.getAuthenticatedURI().segment(1, 'signatures.json');
  this.post(uri, signature, success, failure);
};


module.exports = Signatures;
