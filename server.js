//server.js
//
// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var Keychain   = require('./app/models/keychain');

var gitrepo    = "https://github.com/anoochit/keychain-nodejs";

var mongoose   = require('mongoose');
mongoose.connect('mongodb://0.0.0.0:27017/Keychain');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// ====================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log(req.method, req.url);
	next(); // make sure we go to the next routes and don't stop here
});

// on routes that end in /keys
// ----------------------------------------------------
router.route('/keys')
	// create a keychain (accessed at POST http://localhost:8080/api/keys)
	.post(function(req, res) {
		
		var keychain = new Keychain();
		keychain.email = req.body.email;  
		keychain.key = req.body.key;

		// save the keychain and check for errors
		keychain.save(function(err) {
			if (err)
				res.send(err);
			res.json({ message: 'keychain created!' });
		});
		
	})

	.get(function(req, res) {
		res.redirect(gitrepo);
	});

// on routes that end in /keys/:email
// ----------------------------------------------------
router.route('/keys/:keychain_email')

	// get the keychain with that id (accessed at GET http://localhost:8080/api/keys/:email)
	.get(function(req, res) {
		Keychain.findOne(req.params.keychain_email, function(err, keychain) {
			if (err)
				res.send(err);
			res.json(keychain);
		});
	})

	// update the keychain with this id (accessed at PUT http://localhost:8080/api/keys/:email)
	.put(function(req, res) {
		Keychain.findOne(req.params.keychain_email, function(err, keychain) {

			if (err)
				res.send(err);

			keychain.key = req.body.key; 	// update the keys info

			// save the keychain
			keychain.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'keychain updated!' });
			});

		});
	})

	// delete the keychain with this id (accessed at DELETE http://localhost:8080/api/keys/:email)
	.delete(function(req, res) {
		Keychain.remove({
			email: req.params.keychain_email
		}, function(err, keychain) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.redirect(gitrepo);
});


// all of our routes will be prefixed with /api
app.use('/api', router);

app.get('/', function(req, res){
  res.redirect(gitrepo);
});


// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

