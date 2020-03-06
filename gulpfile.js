// Required Gulp Modules
/******************************/
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssnano = require('gulp-cssnano');
var rename = require('gulp-rename');
var wait = require('gulp-wait');

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
}); 
