var gulp = require('gulp');

// Watch task
gulp.task('watch', ['build'], function() {
    gulp.watch(['./application/filters/**/*.js', './application/services/**/*.js', './application/components/**/*.js', './application/components/**/*.html' ], ['scripts']);
    gulp.watch(['./application/styles/*.css', './application/components/**/*.css'], ['styles']);
    gulp.watch('./application/index.html', ['index']);
});
