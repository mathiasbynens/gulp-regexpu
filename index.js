var applySourceMap = require('vinyl-sourcemaps-apply');
var gutil = require('gulp-util');
var regexpu = require('regexpu');
var through = require('through2');

module.exports = function() {
	return through.obj(function(file, encoding, callback) {
		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
			this.emit('error', new gutil.PluginError(
				'gulp-regexpu',
				'Streaming not supported'
			));
			return callback();
		}

		var options = {};
		var needsSourceMap = file.sourceMap;
		if (needsSourceMap) {
			// TODO: Is this right? Shouldn’t the file names be different?
			// https://github.com/floridoo/gulp-sourcemaps/issues/25
			options.sourceFileName = options.sourceMapName = file.relative;
		}

		try {
			var result = regexpu.transpileCode(file.contents.toString(), options);
			file.contents = new Buffer(needsSourceMap ? result.code : result);
			if (result.map && needsSourceMap) {
				applySourceMap(file, result.map);
			}
		} catch (exception) {
			this.emit('error', new gutil.PluginError(
				'gulp-regexpu', exception, {
					'fileName': file.path
				})
			);
		}

		this.push(file);
		callback();
	});
};
