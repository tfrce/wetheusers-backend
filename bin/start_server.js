var server = require('../server');

server.start(function() {
  console.log('server started at [' + server.info.uri + ']');
});
