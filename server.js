/**
 * Hapi server to run the We the Users backend API.
 */

var config = require('config');
var hapi = require('hapi');
var lodash = require('lodash');

var serverConfig = config.get('SERVER');

var defaultOptions = {};

var port = process.env.PORT || serverConfig.get('PORT');
var server = new hapi.Server(serverConfig.get('URL'), port, defaultOptions);
console.log('created new server instance [' + server.info.uri + ']');
server.route(require('./api/routes').routes);


module.exports = server;
