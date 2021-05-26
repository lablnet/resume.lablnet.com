const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks');
const contants = require('./data');

gulp.task('templates', function () {
  return gulp.src(['pages/**/*.html', '!pages/_partials/**/*'])
      .pipe(nunjucks.compile({...contants}))
      .pipe(require('gulp-url-builder')())
      .pipe(gulp.dest('build'));
});

gulp.task('assets', function (cb) {
  return gulp.src('pages/assets/**/*')
      .pipe(gulp.dest('build/assets'))
});


exports.build = gulp.parallel('templates',   'assets');
exports.watch = function () {
  gulp.watch('pages/**/*.html', { ignoreInitial: false }, gulp.parallel('templates'));
  gulp.watch('pages/assets/**/*', { ignoreInitial: false }, gulp.parallel('assets'));
}

