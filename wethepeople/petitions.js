/**
 * The Petitions API facet.
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
var Petitions = function(baseURI, requestProxy) {
  APIFacet.call(this, baseURI.segment('petitions'), requestProxy);
};

util.inherits(Petitions, APIFacet);


/**
 * Retrieves all petitions matching the supplied search criteria.
 *
 * @param query
 * @param success
 * @param failure
 */
Petitions.prototype.searchPetitions = function(query, success, failure) {

};


/**
 * Fetches petition JSON from a remote server.
 *
 * @param petitionId The ID of the petition to retrieve, e.g. 50a3fd762f2c88cd65000015.
 * @param success
 * @param failure
 */
Petitions.prototype.getPetition = function(petitionId, success, failure) {
  this.get(this.baseURI.segment(petitionId + '.json'), success, failure);
};


/**
 * Returns the (optionally) filtered signatures associated with a petition.
 *
 * @param petitionId The ID of the petition to retrieve, e.g. 50a3fd762f2c88cd65000015.
 * @param query
 * @param success
 * @param failure
 */
Petitions.prototype.getPetitionSignatures = function(petitionId, query, success, failure) {

};


module.exports = Petitions;
