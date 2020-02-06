/* eslint-disable */
const gulp = require('gulp');
const cp = require('child_process');
const gc = require('gulp-changed');
const ts = require('gulp-typescript');
const sm = require('gulp-sourcemaps');
const rm = require('rimraf');
const nm = require('gulp-nodemon');
const cl = require('./webpack.config.js');
const webpack = require('webpack');
const ge = require('gulp-exec');
/* ---------------------------------- */
/* SERVER                             */
/* ---------------------------------- */

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
gulp.task('server:run', gulp.series('server:build', watchServer));
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

/* ---------------------------------- */
/* CLIENT                             */
/* ---------------------------------- */
const consoleStats = {
  colors: true,
  exclude: ['node_modules'],
  chunks: false,
  assets: false,
  timings: true,
  modules: false,
  hash: false,
  version: false,
};
gulp.task('client:clean', cb => {
  rm('./public/dist', () => cb());
});
gulp.task(
  'client:build',
  gulp.series('client:clean', cb => buildClient(cb, cl.default))
);
gulp.task('client:run', gulp.series('client:clean', watchClient));
function buildClient(cb, cl) {
  webpack(cl(true), (err, stats) => {
    if (err) {
      cb(err);
      return;
    }
    console.log(stats.toString(consoleStats));
    cb();
  });
}
function watchClient(cb) {
  return cp.exec('yarn webpack-dev-server --config webpack.config.js');
}

/* ---------------------------------- */
/* RUN TASKS                          */
/* ---------------------------------- */
gulp.task('run', gulp.parallel('server:run', 'client:run'));
