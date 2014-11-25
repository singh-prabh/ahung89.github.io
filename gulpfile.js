var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	buffer = require('vinyl-buffer'),
	connect = require('gulp-connect'),
	source = require('vinyl-source-stream'),
	jshint = require('gulp-jshint');

gulp.task('default', ['connect', 'copylibs', 'compile']);

paths = {
	libs: [
		'js/lib/phaser.min.js'
	],
	entry: './js/Main.js',
	dist: './dist/'
};

gulp.task('compile', function() {
	var bundler = browserify(paths.entry, watchify.args);

	var bundle = function() {
		return bundler
			.bundle()
			.pipe(source('AndrewWorld.min.js'))
			.pipe(buffer())
			// Uncomment the line below once releasing
			//.pipe(uglify())
			.pipe(gulp.dest(paths.dist))
	}

	bundler = watchify(bundler);
	bundler.on('update', bundle);

	return bundle();
});

gulp.task('copylibs', function() {
	gulp.src(paths.libs)
		.pipe(gulp.dest(paths.dist + 'js/lib'))
});

gulp.task('connect', function() {
	connect.server({
		root: [__dirname],
		port: 9000,
		livereload: true // TODO: download livereload chrome extension.
	});
});
