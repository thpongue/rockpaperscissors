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
	return browserify('src/js/main.js')
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
// e2e tests (webdriver and protractor)
//----------------------------------------------------------------
var gprotractor = require('gulp-protractor');

// The protractor task
var gulpProtractorAngular = require('gulp-angular-protractor');

// Downloads the selenium webdriver
gulp.task('webdriver_update', gprotractor.webdriver_update);

// start server then run protractor
gulp.task('protractor', function(cb) {
	gulp.src(['use the contents of protractor.config.js'])
		.pipe(gulpProtractorAngular({
			'configFile': 'protractor.config.js',
			'debug': false,
			'autoStartStopServer': true
		}))
		.on('error', function(e) {
			console.log(e);
		})
		.on('end', cb);
});


//----------------------------------------------------------------
// server
//----------------------------------------------------------------

gulp.task('server8000', function() {
	return startServer(8000);
})

gulp.task('server8001', function() {
	return startServer(8001);
})

function startServer(port) {
	return plugins.connect.server({
		root: 'build',
		port: port
	});
}

gulp.task('stopServer', function() {
	return plugins.connect.serverClose();
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
var runSequence = require('run-sequence');

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

gulp.task('e2e', function(callback) {
  return runSequence('server8001',
		'protractor',
		'stopServer',
		callback);
});


gulp.task('complete', function(callback) {
  return runSequence('localBuild',
		'unit',
		'e2e',
		callback);
});


//----------------------------------------------------------------
// default
//----------------------------------------------------------------
gulp.task('default', ['complete']);
