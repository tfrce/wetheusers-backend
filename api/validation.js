/**
 * Validation functions for WtU data objects.
 */

var joi = require('joi');
var wtpConfig = require('config').get('WE_THE_PEOPLE');

var petitionIdType = joi.string();
if(wtpConfig.get('WHITELIST_PETITIONS')){
  petitionIdType = petitionIdType.valid(
    wtpConfig.get('WHITELISTED_PETITIONS')
  );
}

var signaturePOSTSchema = joi.object().keys({
  firstName: joi.string().max(50).required(),
  lastName: joi.string().max(50).required(),
  email: joi.string().email().required(),
  petitionId: petitionIdType.required(),
  subscribeToEmails: joi.string()
});


var signatureGETSchema = joi.object().keys({
  email: joi.string().email().required()
});


module.exports.signaturePOSTSchema = signaturePOSTSchema;
module.exports.signatureGETSchema = signatureGETSchema;
