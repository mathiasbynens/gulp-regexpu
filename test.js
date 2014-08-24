var assert = require('assert');
var gutil = require('gulp-util');
var regexpu = require('./index.js');

it('should transpile ES6 regex to ES5 with regexpu', function(callback) {
	var stream = regexpu();

	stream.on('data', function(file) {
		// TODO: this is never reached. Awaiting resolution of
		// https://github.com/floridoo/gulp-sourcemaps/issues/25.
		if (/\.map$/.test(file.path)) {
			assert(/"version":3/.test(file.contents.toString()));
			assert.equal(file.relative, 'fixture.js.map');
			return;
		}

		assert(/\\uD834/.test(file.contents.toString()));
		assert.equal(file.relative, 'fixture.js');
	})

	stream.on('end', callback);

	stream.write(new gutil.File({
		'cwd': __dirname,
		'base': __dirname + '/fixture',
		'path': __dirname + '/fixture/fixture.js',
		'contents': new Buffer('var x = /[\\u{1D306}-\\u{1D308}]/u;')
	}));

	stream.end();

});
