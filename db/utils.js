/**
 * Utilities for working with the datastore
 */

var crypto = require('crypto');


var hashEmail = function(email) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(email);
  return md5sum.digest().toString();
};


module.exports.hashEmail = hashEmail;
