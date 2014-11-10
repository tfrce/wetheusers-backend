/**
 * API routes supported by the We the Users service.
 */

var config = require('config');
var path = require('path');

var handlers = require('./handlers');
var validation = require('./validation');

var API_PREFIX = '/api/' + config.get('APPLICATION').get('API_VERSION');


var apiRoutes = [

  {
    path: path.join(API_PREFIX, 'signatures'),
    method: 'POST',
    handler: handlers.addSignature,
    config: {
      validate: {
        payload: validation.signaturePOSTSchema
      }
    }
  },

  {

    path: path.join(API_PREFIX, 'signatures/{email}'),
    method: 'GET',
    handler: handlers.getSignature,
    config: {
      validate: {
        params: validation.signatureGETSchema
      }
    }

  }

];


module.exports.routes = apiRoutes;
