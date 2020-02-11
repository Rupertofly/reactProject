/* eslint-disable */
import gulp from 'gulp';
import cp from 'child_process';
import gc from 'gulp-changed';
import ts from 'gulp-typescript';
import sm from 'gulp-sourcemaps';
import rm from 'rimraf';
import nm from 'gulp-nodemon';
/* ---------------------------------- */
/* SERVER                             */
/* ---------------------------------- */

gulp.task( 'server:clean', cb => {
  rm( './dist', () => cb() );
} );
gulp.task(
  'server:build',
  gulp.series( 'server:clean', function compile() {
    return gulp
      .src( './src/server/**/*.ts' )
      .pipe( gc( './dist' ) )
      .pipe( sm.init() )
      .pipe(
        ts( { target: 'es5', moduleResolution: 'node', lib: ['ES2016', 'dom'] } )
      )
      .on( 'error', () => { } )
      .pipe( sm.write() )
      .pipe( gulp.dest( './dist' ) );
  } )
);
function watchServer() {
  return gulp
    .watch( './src/server/**/*.ts', gulp.series( 'server:build' ) )
    .on( 'error', () => { } );
}
gulp.task( 'server:run', gulp.series( 'server:build', watchServer ) );
gulp.task(
  'server:dev',
  gulp.series(
    'server:build',
    gulp.parallel( watchServer, function nodemonTask() {
      return nm( {
        script: './server.js',
        watch: 'dist',
        exec: 'node --inspect'
      } );
    } )
  )
);

gulp.task( 'client:clean', cb => {
  rm( './public/dist', () => cb() );
} );

gulp.task( 'client:run', gulp.series( 'client:clean', watchClient ) );

function watchClient() {
  return cp.exec( 'yarn webpack-dev-server --config webpack.config.js' );
}

/* ---------------------------------- */
/* RUN TASKS                          */
/* ---------------------------------- */
gulp.task( 'dev', gulp.parallel( 'server:run', 'client:run' ) );
