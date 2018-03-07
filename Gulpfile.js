var gulp    = require('gulp'),
    connect = require('gulp-connect');

gulp.task('connect', function() {
    connect.server({
        root: "public",
        port: 8889
    });
});

gulp.task('default', ['connect']);
