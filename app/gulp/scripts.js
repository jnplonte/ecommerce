var gulp = require('gulp'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    bower = require('main-bower-files'),
    filter = require('gulp-filter'),
    templateCache = require('gulp-angular-templatecache'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    merge2 = require('merge2'),
    template = require('gulp-template');

var compilers = {
    scriptsApp: function() {
        var js = gulp
            .src('./application/**/*.js');
        var templates = gulp
            .src('./application/components/**/*.html')
            .pipe(templateCache({
                module: 'ecommerce.app'
            }));
        return merge2(js, templates)
            .pipe(concat('main.js'));
    },

    scriptsVendor: function() {
        var bowerVendor = gulp
            .src(bower())
            .pipe(concat('vendor.js'));
        var customVendor = gulp
            .src('./node_modules/bootstrap/dist/js/bootstrap.js');
        return merge2(bowerVendor, customVendor)
            .pipe(concat('vendor.js'));
    }
};

for (var compiler in compilers) {
    gulp.task(compiler, (function(compiler) {
        return function() {
            compiler()
                .pipe(ngAnnotate())
                // .pipe(uglify())
                .pipe(gulp.dest('./dist/js/'))
        };
    })(compilers[compiler]));
}

gulp.task('scripts', Object.keys(compilers));
