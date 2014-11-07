/**
 * API routes supported by the We the Users service.
 */

var handlers = require('./handlers');
var validation = require('./validation');


var apiRoutes = [

  {
    path: '/hat',
    method: 'POST',
    handler: handlers.addSignature,
    config: {
      validate: {
        payload: validation.signatureSchema
      }
    }
  }

];


module.exports.routes = apiRoutes;
