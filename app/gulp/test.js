var gulp = require('gulp'),
    path = require('path'),
    Server = require('karma').Server;

gulp.task('test', function (done) {
    new Server({
        configFile: path.join(__dirname, '../', 'karma.conf.js')
    }, function () {
        done();
    }).start();
});
