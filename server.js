/**
 * Hapi server to run the We the Users backend API.
 */

var config = require('config');
var hapi = require('hapi');

var serverConfig = config.get('SERVER');

var defaultOptions = {};

var server = new hapi.Server(serverConfig.URL, serverConfig.PORT, defaultOptions);
server.route(require('./api/routes').routes);


module.exports = server;
