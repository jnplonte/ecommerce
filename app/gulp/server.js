var gulp    = require('gulp'),
    connect = require('gulp-connect');

gulp.task('server', function() {
    connect.server({
        port: 3000,
        root: './dist',
        livereload: true
    });
}); 
