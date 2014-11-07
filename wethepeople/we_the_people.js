/**
 * Top level import for the We the People API.
 *
 * This is a facet based API, with each facet mapping to a top level collection (petitions etc.)
 * in the We the People API.
 *
 * See https://petitions.whitehouse.gov/developers for API documentation.
 */

var events = require('events');
var lodash = require('lodash');
var URI = require('URIjs');

var PetitionsFacet = require('./petitions');
var RequestProxy = require('./request_proxy');
var SignaturesFacet = require('./signatures');
var ValidationsFacet = require('./validations');


var WeThePeople = function(apiKey, opt_useSandbox, opt_maxRequestsPerMinute) {
  events.EventEmitter.call(this);

  var useSandbox = (!lodash.isUndefined(opt_useSandbox) && opt_useSandbox) ? true : false;
  this.baseURI = new URI(
    useSandbox ? 'http://sandbox.api.whitehouse.gov/v1': 'https://api.whitehouse.gov/v1');

  // The API restricts requests to max 1500 per minute. Allow the user to explicitly set the request
  // limit or default to a slightly lower threshold for safety.
  this.requestProxy = new RequestProxy(
    apiKey, lodash.isUndefined(opt_maxRequestsPerMinute) ? 1250 : opt_maxRequestsPerMinute);

  this.petitions = new PetitionsFacet(this.baseURI.clone(), this.requestProxy);
  this.signatures = new SignaturesFacet(this.baseURI.clone(), this.requestProxy);
  this.validations = new ValidationsFacet(this.baseURI.clone(), this.requestProxy);
};


module.exports = WeThePeople;
