/**
 * Validation functions for WtU data objects.
 */

var joi = require('joi');

var signatureSchema = joi.object().keys({
  firstName: joi.string().max(50).required(),
  lastName: joi.string().max(50).required(),
  email: joi.string().email().required(),
  subscribeToEmails: joi.string()
});


var signatureValidationSchema = joi.object().keys({
  email: joi.string().email().required()
});


module.exports.signatureSchema = signatureSchema;
module.exports.signatureValidationSchema = signatureValidationSchema;
