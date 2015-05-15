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
var gprotractor = require('gulp-protractor');
var gulpProtractorAngular = require('gulp-angular-protractor');


//----------------------------------------------------------------
// e2e tests (webdriver and protractor)
//----------------------------------------------------------------
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


//----------------------------------------------------------------
// compound tasks
//----------------------------------------------------------------
gulp.task('stopServer', function() {
	return plugins.connect.serverClose();
});

gulp.task('e2e', function(callback) {
  return runSequence('server8001',
		'protractor',
		'stopServer',
		callback);
});


//----------------------------------------------------------------
// default
//----------------------------------------------------------------
gulp.task('default', ['e2e']);
