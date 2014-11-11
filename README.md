# gulp-regexpu [![Build status](https://travis-ci.org/mathiasbynens/gulp-regexpu.svg?branch=master)](https://travis-ci.org/mathiasbynens/gulp-regexpu) [![Dependency status](https://gemnasium.com/mathiasbynens/gulp-regexpu.svg)](https://gemnasium.com/mathiasbynens/gulp-regexpu)

gulp-regexpu is a [Gulp](http://gulpjs.com/) plugin to transpile ES6 Unicode regular expressions to ES5 with [_regexpu_](https://mths.be/regexpu).

*Issues with the output should be reported on [the _regexpu_ issue tracker](https://github.com/mathiasbynens/regexpu/issues).*

**Note:** You may want to use [gulp-traceur](https://github.com/sindresorhus/gulp-traceur) instead, as it supports [_regexpu_](https://mths.be/regexpu) transpilation as well as many other ES6 features.

## Install

```bash
$ npm install gulp-regexpu --save-dev
```

## Usage

```js
var gulp = require('gulp');
var regexpu = require('gulp-regexpu');

gulp.task('default', function() {
  return gulp.src('src/app.js')
    .pipe(regexpu())
    .pipe(gulp.dest('dist'));
});
```

## Source Maps

Use [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) like this:

```js
var gulp = require('gulp');
var concat = require('gulp-concat');
var regexpu = require('gulp-regexpu');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
      .pipe(regexpu())
      .pipe(concat('all.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
});
```

## Notes

Thanks to [Sindre Sorhus](https://github.com/sindresorhus), whose many great examples of Gulp plugins made it very easy to create this one. 🍺

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](https://mathiasbynens.be/) |

## License

_gulp-regexpu_ is available under the [MIT](https://mths.be/mit) license.
