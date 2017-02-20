var gulp = require('gulp'),
    requireDir = require('require-dir');

requireDir('./gulp');

gulp.task('build', ['index', 'scripts', 'styles']);
gulp.task('default', [/*'test',*/ 'build', 'server', 'watch']);
