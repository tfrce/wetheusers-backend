/**
 * Joi schema objects for We the People API calls.
 */

var joi = require('joi');

var petitionQuery = joi.object().keys({
  isPublic: joi.number().integer().min(0).max(1),
  isSignable: joi.number().integer().min(0).max(1),
  createdBefore: joi.number().integer(),
  createdAfter: joi.number().integer(),
  createdAt: joi.number().integer(),
  limit: joi.number().integer().max(1000),
  offset: joi.number().integer(),
  title: joi.string(),
  body: joi.string(),
  signatureThresholdCeiling: joi.number().integer(),
  signatureThreshold: joi.number().integer(),
  signatureThresholdFloor: joi.number().integer(),
  signatureCountCeiling: joi.number().integer(),
  signatureCount: joi.number().integer(),
  signatureCountFloor: joi.number().integer(),
  url: joi.string(), // NOTE: per the API docs, this is lowercased in contrast to it's use elsewhere
  status: joi.string(),
  responseID: joi.number().integer(),
  responseAssociationTimeBefore: joi.number().integer()
});


var petitionSignaturesQuery = joi.object().keys({
  URL: joi.string(), // Don't treat as required, although the docs imply it is
  city: joi.string(),
  state: joi.string(),
  zipcode: joi.number().integer(),
  country: joi.string(),
  createdBefore: joi.number().integer(),
  createdAfter: joi.number().integer(),
  createdAt: joi.number().integer(),
  limit: joi.number().integer().max(1000),
  offset: joi.number().integer()
});


// NOTE: this is derived from the example. The docs for this are really unclear.
var signature = joi.object().keys({
  petition_id: joi.string().required(),
  email: joi.string().email().required(),
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  zip: joi.number().integer()
});


var validationsQuery = joi.object().keys({
  petition_id: joi.string(),
  limit: joi.number().integer().max(1000),
  offset: joi.number().integer()
});


module.exports.petitionQuery = petitionQuery;
module.exports.petitionSignaturesQuery = petitionSignaturesQuery;
module.exports.signature = signature;
module.exports.validationsQuery = validationsQuery;
