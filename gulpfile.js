//----------------------------------------------------------------
// Include gulp
//----------------------------------------------------------------
const gulp = require('gulp');


//----------------------------------------------------------------
// automatically pull in any tasks from package.json
//----------------------------------------------------------------
const plugins = require('gulp-load-plugins')();


//----------------------------------------------------------------
// Provide access to all the tasks in child projects
//----------------------------------------------------------------
plugins.hub(['front_end/gulpfile.js', 'back_end/gulpfile.js']);


//----------------------------------------------------------------
// figure out how to get these working via gulp-load-plugins
//----------------------------------------------------------------
const runSequence = require('run-sequence');
const gprotractor = require('gulp-protractor');
const gulpProtractorAngular = require('gulp-angular-protractor');


//----------------------------------------------------------------
// e2e tests (webdriver and protractor)
//----------------------------------------------------------------
// Downloads the selenium webdriver
gulp.task('webdriver_update', gprotractor.webdriver_update);

// start server then run protractor
gulp.task('protractor', function(cb) {
	gulp.src(['use the contents of protractor.config.js'])
		.pipe(gulpProtractorAngular({
			'configFile': __dirname+'/protractor.config.js', // the hub plugin seems to break relative paths
			'debug': false,
			'autoStartStopServer': true
		}))
		.on('error', function(e) {
			console.log(e);
		})
		.on('end', cb);
});


//----------------------------------------------------------------
// copy front end into back end
//----------------------------------------------------------------
gulp.task('copy_files', function() {
	return gulp.src('front_end/build/**/*.*')
		.pipe(gulp.dest('back_end/build/'));
});


//----------------------------------------------------------------
// compound tasks
//----------------------------------------------------------------
gulp.task('e2e', function(callback) {
  return runSequence('protractor',
		callback);
});

gulp.task('complete', function(callback) {
  return runSequence(
		'front_end_complete',
		'back_end_complete',
		'copy_files',
		'e2e',
		callback);
});


//----------------------------------------------------------------
// default
//----------------------------------------------------------------
gulp.task('default', ['complete']);
