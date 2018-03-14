'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var minifyjs = require('gulp-minify');

var paths = {
  scss: './src/sass/**/*.scss',
  js: './src/js/*.js'
}
 
gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:compress', function () {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('js:compress', function () {
  return gulp.src(paths.js)
    .pipe(minifyjs())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('deploy', ['sass:compress', 'js:compress']);
 
gulp.task('watch', function () {
  gulp.watch(paths.scss, ['sass']);
});