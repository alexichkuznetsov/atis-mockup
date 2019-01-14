const { src, dest, series } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const cleanCSS = require('gulp-clean-css');
const prefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

function compile() {
	return src('scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(prefixer({ browsers: ['last 5 versions'] }))
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(rename('main.css'))
		.pipe(dest('assets/css'));
}

exports.default = compile;
