'use strict';
 
var gulp     = require('gulp'),
    sass     = require('gulp-sass'),
    rename   = require('gulp-rename'),
    minifyjs = require('gulp-minify'),
    header   = require('gulp-header');

var paths = {
  scss: './src/sass/**/*.scss',
  js: './src/js/*.js'
}

var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');
 
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
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./dist/'));
});



gulp.task('js:compress', function () {
  return gulp.src(paths.js)
    .pipe(minifyjs())
    .pipe(header(banner, { pkg: pkg }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('deploy', ['sass:compress', 'js:compress']);
 
gulp.task('watch', function () {
  gulp.watch(paths.scss, ['sass']);
});