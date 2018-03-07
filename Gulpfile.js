var gulp    = require('gulp'),
    connect = require('gulp-connect'),
    proxy   = require('http-proxy-middleware');

gulp.task('connect', function() {
    connect.server({
        root: "public",
        port: 8889,
        middleware: function(connect, opt) {
            return [
                // Add services here
                proxy('/login', {
                    target: 'http://127.0.0.1:8889',
                    changeOrigin: true
                }),
                proxy('/dpm', {
                    target: 'http://127.0.0.1:8887',
                    changeOrigin: true
                })
            ]
        }
    });
});

gulp.task('default', ['connect']);
