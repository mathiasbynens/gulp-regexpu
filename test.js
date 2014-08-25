var assert = require('assert');
var gutil = require('gulp-util');
var sourceMaps = require('gulp-sourcemaps');
var regexpu = require('./index.js');

it('should transpile ES6 regex to ES5 with regexpu', function(callback) {
	var stream = regexpu();

	stream.on('data', function(file) {
		assert(/\\uD834/.test(file.contents.toString()));
		assert.equal(file.relative, 'fixture.js');
	});

	stream.on('end', callback);

	stream.write(new gutil.File({
		'cwd': __dirname,
		'base': __dirname + '/fixture',
		'path': __dirname + '/fixture/fixture.js',
		'contents': new Buffer('var x = /[\\u{1D306}-\\u{1D308}]/u;')
	}));

	stream.end();

});

it('should generate source maps', function(callback) {
	var init = sourceMaps.init();
	var write = sourceMaps.write();
	init
		.pipe(regexpu())
		.pipe(write);

	write.on('data', function(file) {
		assert.equal(file.sourceMap.mappings, 'AAAA,CAAC,CAAC,EAAE,EAAE,6BAA0B');
		var contents = file.contents.toString();
		assert(/\\uD834/.test(contents));
		assert(/sourceMappingURL=data:application\/json;base64/.test(contents));
		callback();
	});

	init.write(new gutil.File({
		'cwd': __dirname,
		'base': __dirname + '/fixture',
		'path': __dirname + '/fixture/fixture.js',
		'contents': new Buffer('var x = /[\\u{1D306}-\\u{1D308}]/u;'),
		'sourceMap': ''
	}));

	init.end();
});
