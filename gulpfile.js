var gulp = require('gulp');
var slim = require('gulp-slim');
var sass = require('gulp-sass')(require('sass'));
var plumber = require('gulp-plumber');
var prefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var watching = false;

function handleError(error) {
  if (!watching) throw error;
  console.error(error.toString());
  this.emit('end');
}

function enableWatch(done) {
  watching = true;
  done();
}

gulp.task('slim', function(){
  return gulp.src('*.slim')
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(slim())
    .pipe(gulp.dest('.'));
});

gulp.task('sass', function(){
  return gulp.src('css/*.sass')
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(sass())
    .pipe(prefixer('last 2 version'))
    .pipe(gulp.dest('css'));
});

gulp.task('coffee', function(){
  return gulp.src('js/*.coffee')
    .pipe(plumber({ errorHandler: handleError }))
    .pipe(coffee())
    .pipe(gulp.dest('js'));
});

gulp.task('build', gulp.parallel('slim', 'sass', 'coffee'));

function watch() {
  gulp.watch('*.slim', gulp.series('slim'));
  gulp.watch('css/*.sass', gulp.series('sass'));
  return gulp.watch('js/*.coffee', gulp.series('coffee'));
}

gulp.task('default', gulp.series(enableWatch, 'build', watch));
