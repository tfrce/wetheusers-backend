/**
 * Data access methods for signature objects.
 */

var adapter = require('./adapter');


/**
 * Save a signature to the persistent store.
 *
 * @param signature The signature to save.
 * @param success
 * @param error
 */
var saveSignature = function(signature, success, error) {
  adapter.saveSignature(signature, success, error);
};


/**
 * Fetch a signature from the persistent store.
 *
 * @param email The email of the signatory whose signature we're fetching.
 * @param success
 * @param error
 */
var getSignature = function(email, success, error) {
  adapter.getSignature(email, success, error);
};


module.exports.saveSignature = saveSignature;
module.exports.getSignature = getSignature;
