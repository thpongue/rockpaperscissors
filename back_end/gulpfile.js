const gulp = require('gulp')
const runSequence = require('run-sequence').use(gulp);
const server = require('gulp-live-server')('src/server.js', {env: {NODE_ENV: 'build'}});

gulp.task('express', function() {
  server.start()
})

//----------------------------------------------------------------
// copy files to build
//----------------------------------------------------------------
gulp.task('copy_files', function() {
	return gulp.src('src/**/*.js')
		.pipe(gulp.dest('build'));
});

gulp.task('back_end_complete', function(callback) {
  return runSequence(
		'copy_files',
		'express',
		callback);
});

//----------------------------------------------------------------
// default
//----------------------------------------------------------------
gulp.task('default', ['back_end_complete']);
