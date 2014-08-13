// keychain.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var KeychainSchema   = new Schema({
	email: String,
	key: String
});

module.exports = mongoose.model('Keychain', KeychainSchema);