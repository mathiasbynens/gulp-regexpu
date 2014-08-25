var applySourceMap = require('vinyl-sourcemaps-apply');
var gutil = require('gulp-util');
var regexpu = require('regexpu');
var through = require('through2');

module.exports = function() {
	return through.obj(function(file, encoding, callback) {
		if (file.isNull()) {
			callback(null, file);
			return;
		}

		if (file.isStream()) {
			callback(new gutil.PluginError(
				'gulp-regexpu',
				'Streaming not supported'
			));
			return;
		}

		var options = {};
		var needsSourceMap = file.sourceMap;
		if (needsSourceMap) {
			options.sourceFileName = options.sourceMapName = file.relative;
		}

		try {
			var result = regexpu.transpileCode(file.contents.toString(), options);
			file.contents = new Buffer(needsSourceMap ? result.code : result);
			if (result.map && needsSourceMap) {
				applySourceMap(file, result.map);
			}
			callback(null, file);
		} catch (exception) {
			callback(new gutil.PluginError(
				'gulp-regexpu', exception, {
					'fileName': file.path
				}
			));
		}

	});
};
