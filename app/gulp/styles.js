var gulp       = require('gulp'),
    cssnano    = require('gulp-cssnano'),
    concat     = require('gulp-concat'),
    connect    = require('gulp-connect');

// Styles app
gulp.task('stylesMain', function() {
    return gulp.src(['./application/styles/*.css', './application/components/**/*.css'])
        .pipe(cssnano())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

gulp.task('stylesVendor', function() {
    return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.css','./application/styles/vendor/**/*.css'])
        .pipe(cssnano())
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload());
});

gulp.task('styles', ['stylesMain', 'stylesVendor']);
