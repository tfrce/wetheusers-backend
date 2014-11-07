/**
 * Adapters for different datastore types.
 */

var dbConfig = require('config').get('DB');
var dirty = require('dirty');


var DirtyAdapter = function(dbPath) {
  this.db = dirty(dbPath);
};


DirtyAdapter.prototype.saveSignature = function(signature, success, error) {
  this.db.set(signature.email, signature, success);
};


DirtyAdapter.prototype.getSignature = function(email, success, error) {
  var signature = this.db.get(email);
  success(signature);
};


if (dbConfig.get('TYPE') === 'DIRTY') {
  module.exports = new DirtyAdapter(dbConfig.get('DIRTY_DB_PATH'));
} else {

}
