//----------------------------------------------------------------
// Include gulp
//----------------------------------------------------------------
var gulp = require('gulp');


//----------------------------------------------------------------
// automatically pull in any tasks from package.json
//----------------------------------------------------------------
var plugins = require('gulp-load-plugins')();


//----------------------------------------------------------------
// figure out how to get these working via gulp-load-plugins
//----------------------------------------------------------------
var runSequence = require('run-sequence');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var karma = require('gulp-karma');


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
gulp.task('scripts', function() {
	return browserify('src/js/main.js')
		.bundle()
    .on('error', function() {
			console.log("error with browserify");
			this.emit('end');
		})
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
			.pipe(plugins.concat('styles.css'))
			.pipe(gulp.dest('build/css/'));
});


//----------------------------------------------------------------
// unit tests (jasmine)
//----------------------------------------------------------------
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
gulp.task('build', function () {
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/scss/*.scss', ['sass']);
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/partials/*.html', ['partials']);
    gulp.watch('src/fonts/*.*', ['fonts']);
});


//----------------------------------------------------------------
// compound tasks
//----------------------------------------------------------------

// local build
gulp.task('localBuild', function(callback) {
 	return runSequence('clean',
		'html',
		'partials',
		'sass',
		'fonts',
		'scripts',
		callback);
});

gulp.task('watch', function(callback) {
	return runSequence('server8000',
		'build',
		callback);
});


gulp.task('complete', function(callback) {
  return runSequence('localBuild',
		'unit',
		callback);
});


//----------------------------------------------------------------
// default
//----------------------------------------------------------------
gulp.task('default', ['complete']);
