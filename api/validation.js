/**
 * Validation functions for WtU data objects.
 */

var joi = require('joi');

var signaturePOSTSchema = joi.object().keys({
  firstName: joi.string().max(50).required(),
  lastName: joi.string().max(50).required(),
  email: joi.string().email().required(),
  subscribeToEmails: joi.string()
});


var signatureGETSchema = joi.object().keys({
  email: joi.string().email().required()
});


module.exports.signaturePOSTSchema = signaturePOSTSchema;
module.exports.signatureGETSchema = signatureGETSchema;
