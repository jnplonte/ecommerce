var gulp = require('gulp'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin'),
    template = require('gulp-template');

var BASE_URL = 'http://localhost:3000/';

gulp.task('index', function() {
    return gulp
        .src('./application/index.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(connect.reload());
});
