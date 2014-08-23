var path          = require('path'),
	_             = require('lodash'),
    chalk         = require('chalk'),
    express       = require('express'),
    shoe          = require('shoe'),
    morgan        = require('morgan');

var defaults = {
	env: 'development',
	port: 4000,
	livereload: false
};

module.exports = function(opts) {

	opts = _.extend({}, defaults, opts);

	console.log('Environment: ', chalk.yellow(opts.env) );

	var app = express();

	// if we're in development mode, inject lr code
	if (opts.env == 'development' && opts.livereload) {
		app.use(require('connect-livereload')());
		console.log( chalk.green('LiveReload middleware loaded for port ' + opts.livereload) );
	}
	
	// log requests to STDOUT
	app.use(morgan('combined'));

	// serve up the public dir
	app.use(express.static(path.resolve(__dirname + '/../public')));
	
	// setup websockets
	var sock = shoe(function(stream) {
		setInterval(function() {
			stream.write(JSON.stringify({time: Date.now()}));
		}, 1000);
	});

	// start listening
	var server = app.listen(opts.port);
	sock.install(server, '/api');

	console.log( chalk.green('Listening on port ' + opts.port) );
};