/* eslint-disable */
const gulp = require('gulp');
const gc = require('gulp-changed');
const ts = require('gulp-typescript');
const sm = require('gulp-sourcemaps');
const rm = require('rimraf');
const nm = require('gulp-nodemon');
gulp.task('server:clean', cb => {
  rm('./dist', () => cb());
});
gulp.task(
  'server:build',
  gulp.series('server:clean', function compile() {
    return gulp
      .src('./src/server/**/*.ts')
      .pipe(gc('./dist'))
      .pipe(sm.init())
      .pipe(
        ts({ target: 'es5', moduleResolution: 'node', lib: ['ES2016', 'dom'] })
      )
      .on('error', () => {})
      .pipe(sm.write())
      .pipe(gulp.dest('./dist'));
  })
);
function watchServer() {
  return gulp
    .watch('./src/server/**/*.ts', gulp.series('server:build'))
    .on('error', () => {});
}
gulp.task(
  'server:watch',
  gulp.series('server:build', watchServer)
);
gulp.task(
  'server:dev',
  gulp.series(
    'server:build',
    gulp.parallel(watchServer, function nodemonTask() {
      return nm({
        script: './server.js',
        watch: 'dist',
      });
    })
  )
);
