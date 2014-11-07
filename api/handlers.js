/**
 * Handlers for the API routes.
 */

var hapi = require('hapi');
var lodash = require('lodash');

var signatures = require('../db/signatures');


/**
 * Adds a signature to the datastore.
 * @param request The Hapi request object
 * @param reply The Hapi reply object.
 */
var addSignature = function(request, reply) {

  var newSignature = request.payload;
  newSignature.isValidated = false;

  var success = function() {
    reply({status: 'success'});
  };

  var failure = function(err) {
    throw err;
  };

  signatures.saveSignature(newSignature, success, failure);

};


/**
 * Check whether a given signature has been validated.
 *
 * @param request
 * @param reply
 */
var getSignatureValidationState = function(request, reply) {

  var success = function(signature) {

    if (!lodash.isUndefined(signature) && signature.isValidated) {
      reply({status: 'success'});
    } else {
      reply(hapi.error.notFound('valid signature not found'));
    }

  };

  var error = function(err) {
    throw err;
  };

  signatures.getSignature(request.params.email, success, error)
};


module.exports.addSignature = addSignature;
module.exports.getSignatureValidationState = getSignatureValidationState;
