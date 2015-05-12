//----------------------------------------------------------------
// Include gulp
//----------------------------------------------------------------
var gulp = require('gulp');


//----------------------------------------------------------------
// automatically pull in any tasks from package.json
//----------------------------------------------------------------
var plugins = require('gulp-load-plugins')({lazy: false});


//----------------------------------------------------------------
// clean
//----------------------------------------------------------------
gulp.task('clean', function(cb) {
	return gulp.src('build/**/*.*', {read: false})
		.pipe(plugins.clean());
});


//----------------------------------------------------------------
// process scripts
//----------------------------------------------------------------
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');

gulp.task('scripts', function() {
	browserify('src/js/main.js')
		.bundle()
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('build/js'))
});


//----------------------------------------------------------------
// copy html
//----------------------------------------------------------------
gulp.task('html', function() {
	return gulp.src('src/*.html')
		.pipe(gulp.dest('build/'));
});


//----------------------------------------------------------------
// copy partials
//----------------------------------------------------------------
gulp.task('partials', function() {
	return gulp.src('src/partials/*.html')
		.pipe(gulp.dest('build/partials/'));
});


//----------------------------------------------------------------
// copy fonts
//----------------------------------------------------------------
gulp.task('fonts', function() {
	return gulp.src('fonts/*.*')
		.pipe(gulp.dest('build/fonts/'));
});


//----------------------------------------------------------------
// sass
//----------------------------------------------------------------
gulp.task('sass', function () {
    return gulp.src('src/scss/*.scss')
        .pipe(plugins.sass())
        .pipe(gulp.dest('build/css/'));
});


//----------------------------------------------------------------
// unit tests (jasmine)
//----------------------------------------------------------------
var karma = require('gulp-karma');

gulp.task('unit', function() {
  // Be sure to return the stream
  // NOTE: Using the fake './foobar' so as to run the files
  // listed in karma.conf.js INSTEAD of what was passed to
  // gulp.src !
  return gulp.src('./foobar')
    .pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    }))
    .on('error', function(err) {
      // Make sure failed tests cause gulp to exit non-zero
      console.log(err);
      this.emit('end'); //instead of erroring the stream, end it
    });
});


//----------------------------------------------------------------
// watch
//----------------------------------------------------------------
gulp.task('watch', function () {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/partials/*.html', ['partials']);
    gulp.watch('src/fonts/*.*', ['fonts']);
});


//----------------------------------------------------------------
// compound tasks
//----------------------------------------------------------------
var runSequence = require('run-sequence');

// local build
gulp.task('localBuild', function(callback) {
  runSequence('clean',
              'html',
              'partials',
              'sass',
              'fonts',
              'scripts',
              callback);
});


//----------------------------------------------------------------
// default
//----------------------------------------------------------------
gulp.task('default', ['localBuild']);
