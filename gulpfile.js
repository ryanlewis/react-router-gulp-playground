'use strict';

var gulp        = require('gulp'),
    gulpif      = require('gulp-if'),
    gutil       = require('gulp-util'),
    browserify  = require('gulp-browserify'),
    uglify      = require('gulp-uglify'),
    watch       = require('gulp-watch'),
    open        = require('gulp-open'),
    rename      = require('gulp-rename'),
    tinylr      = require('tiny-lr'),
    livereload  = require('gulp-livereload'),

    server      = require('./server');

gutil.log('Environment', gutil.colors.cyan(gulp.env.production ? 'Production' : 'Development'));

var SERVER_PORT = 4000;
var LIVERELOAD_PORT = 35729;

gulp.task('scripts', function() {
  var opts = {
    insertGlobals : false,
    transform: ['reactify'],
    extensions: ['.jsx'],
    debug: !gulp.env.production
  };

  return gulp.src('./src/js/bhn.jsx', {read: false})
    .pipe(browserify(opts))
    .pipe(gulpif(gulp.env.production, uglify({
      mangle: { except: ['require', 'export', '$super'] }
    })))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./public/js'));
});


gulp.task('server', function() {
  var serverApp = server({env: 'development', port: SERVER_PORT, livereload: LIVERELOAD_PORT});
});


gulp.task('livereload', function() {
  livereload.listen(LIVERELOAD_PORT);
});


gulp.task('open', function() {
  var options = {
    url: "http://localhost:" + SERVER_PORT,
    app: "chrome"
  };

  gulp.src("public/index.html")
    .pipe(open("", options));
});

gulp.task('default', ['scripts', 'server', 'livereload'], function() {
  gulp.env.watch = true;
  livereload.listen(LIVERELOAD_PORT);

  gulp.watch('src/**/*', ['scripts']);
  gulp.watch('public/js/**/*').on('change', livereload.changed);
  gulp.watch('public/**/*.html', livereload.changed);
  gulp.run('open');
});
