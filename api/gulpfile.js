var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');

// Task
gulp.task('default', function() {
	livereload.listen();

	nodemon({
		script: 'app.js',
		ext: 'js'
	}).on('restart', function(){
		gulp.src('app.js, scripts/**/*.js')
			.pipe(livereload())
			.pipe(notify('Reloading page, please wait...'));
	});
});
