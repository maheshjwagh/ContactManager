var gulp = require('gulp');

var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var jasmine = require('gulp-jasmine');
var browserSync = require('browser-sync');

gulp.task('styles', function() {
    gulp.src(['Content/*.css'])
	.pipe(minifyCSS())
	.pipe(gulp.dest('build/styles/'));
});

gulp.task('jshint', function() {
  gulp.src('scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
	gulp.src(['scripts/respond.js'])
	.pipe(uglify())
	.pipe(gulp.dest('build/scripts/'))
});

gulp.task('jasmine', function () {
    return gulp.src('test/spec/test.js')
        .pipe(jasmine());
});

gulp.task('browser-sync-init', function () {
    browserSync.init({
        proxy: "dev.localhost"
        //proxy: "localhost:64882"
    });
});

gulp.task('browser-sync', function () {
   var files = [
      'Content/*.css'
   ];   
});

gulp.task('default', ['styles', 'scripts', 'browser-sync-init', 'browser-sync'], function () {
	
    gulp.watch('Content/*.css', ['styles']).on("change", browserSync.reload);
	
	//gulp.watch('scripts/*.js', ['jshint','scripts']);	
	gulp.watch('scripts/*.js', ['jasmine', 'scripts']).on("change", browserSync.reload);
		
	gulp.watch('Content/*.css').on("change", browserSync.reload);

});