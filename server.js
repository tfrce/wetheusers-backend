/**
 * Hapi server to run the We the Users backend API.
 */

var config = require('config');
var hapi = require('hapi');
var lodash = require('lodash');

var serverConfig = config.get('SERVER');

var defaultOptions = {
  // Restrict the server to only accepting connections from the specified servers
  cors: {
    origin: serverConfig.get('ORIGIN_SERVERS')
  }
};

var server = new hapi.Server(serverConfig.get('URL'), serverConfig.get('PORT'), defaultOptions);
server.route(require('./api/routes').routes);


module.exports = server;
