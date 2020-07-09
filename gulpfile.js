// Required Gulp Modules
/******************************/
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var wait = require('gulp-wait');
var minify = require("gulp-minify");
const { src, dest }  = require("gulp");

// Compile the SASS Files
/*****************************/
gulp.task('sass', function() {
	return gulp.src('sass/theme.scss')
		.pipe(wait(1500))
		.pipe(sass())
		.pipe(gulp.dest('css'))
});

// Minify the CSS Files
/*****************************/
gulp.task('minicss', function() {
	return gulp.src('css/theme.css')
		.pipe(cssnano())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('css'))
});

// Watch for changes...
/*****************************/
gulp.task('watch', function() {
	gulp.watch('sass/**/*.scss', gulp.series('sass','minicss', function(done) {
		done();
	}));
	gulp.watch('js/scripts.js', gulp.series('jsminify', function(done) {
		done();
	}));
}); 

// Minify JS
/*****************************/
gulp.task('jsminify', function() {
	return src('js/scripts.js', { allowEmpty: true }) 
        .pipe(minify({noSource: true, ext: {
	        src: '.js',
	        min: '.min.js'
        }}))
        .pipe(dest('js'))
});
