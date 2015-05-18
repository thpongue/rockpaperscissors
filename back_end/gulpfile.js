const gulp = require('gulp')
const gls = require('gulp-live-server')

const server = gls.new(['src/app.js'])

gulp.task('express', function() {
  server.start()
})

//----------------------------------------------------------------
// default
//----------------------------------------------------------------
gulp.task('default', ['express']);
