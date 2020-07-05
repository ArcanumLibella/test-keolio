// Initialize modules
// Importing specific gulp API functions lets us write them below as series() instead of gulp.series()
const { src, dest, watch, series, parallel } = require('gulp');
// Importing all the Gulp-related packages we want to use
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const imagemin = require('gulp-imagemin');
var replace = require('gulp-replace');
var rename = require('gulp-rename'); // Rename the files.

// JS plugins
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

// File paths
const files = {
	scssPath: 'app/scss/**/*.scss',
	jsPath: 'app/js/**/*.js',
	imgPath: 'app/images/**/*.png'
};

// SHORTCUT JS
var jsSRC = 'main.js';
var jsFOLDER = './app/js/';
var jsDIST = './dist/js/';
var jsWATCH = './app/js/**.*.js';
var jsFILES = [ jsSRC ];

// Sass task: compiles the style.scss file into style.css
function scssTask() {
	return src(files.scssPath)
		.pipe(sourcemaps.init()) // initialize sourcemaps first
		.pipe(sass()) // compile SCSS to CSS
		.pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
		.pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
		.pipe(dest('dist')); // put final CSS in dist folder
}

// JS task: concatenates and uglifies JS files to script.js
// function jsTask() {
// 	return src([
// 		files.jsPath
// 		//,'!' + 'includes/js/jquery.min.js', // to exclude any specific files
// 	])
// 		.pipe(concat('main.js'))
// 		.pipe(uglify())
// 		.pipe(dest('dist/js'));
// }

// Task: 'js'
//============================================================================
function jsTask() {
	jsFILES.map(function(entry) {
		return browserify({
			entries: [ jsFOLDER + entry ]
		})
			.transform(babelify, { presets: [ '@babel/preset-env' ] })
			.bundle()
			.pipe(source(entry))
			.pipe(rename({ extname: '.min.js' }))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(uglify())
			.pipe(sourcemaps.write('./'))
			.pipe(dest(jsDIST));
	});
}

function imgTask() {
	return (
		src([ files.imgPath ])
			// .pipe(gulpif(isProd, imagemin({ verbose: true })))
			.pipe(dest('dist/images'))
	);
}

// Cachebust
function cacheBustTask() {
	var cbString = new Date().getTime();
	return src([ 'index.html' ]).pipe(replace(/cb=\d+/g, 'cb=' + cbString)).pipe(dest('.'));
}

// // Watch task: watch SCSS and JS files for changes
// // If any change, run scss and js tasks simultaneously
function watchTask() {
	watch(
		[ files.scssPath, files.jsPath, files.imgPath ],
		{ interval: 1000, usePolling: true }, //Makes docker work
		series(parallel(scssTask, jsTask, imgTask), cacheBustTask)
	);
}

// Export the default Gulp task so it can be run
// Runs the scss and js tasks simultaneously
// then runs cacheBust, then watch task
exports.default = series(parallel(scssTask, jsTask, imgTask), cacheBustTask, watchTask);
