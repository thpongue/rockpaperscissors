const gulp = require('gulp')
const runSequence = require('run-sequence');
const gls = require('gulp-live-server')

const server = gls('src/app.js', {env: {NODE_ENV: 'build'}});

gulp.task('express', function() {
  server.start()
})

gulp.task('back_end_complete', ['express']);

//----------------------------------------------------------------
// default
//----------------------------------------------------------------
gulp.task('default', ['back_end_complete']);
