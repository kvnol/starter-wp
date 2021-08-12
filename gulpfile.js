'use strict';

// Dependencies
const { parallel, src, dest, watch } = require('gulp');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const shortColor = require('postcss-short-color');
const cleanCSS = require('gulp-clean-css');
const rollup = require('gulp-better-rollup');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const criticalCss = require('gulp-penthouse');

// Folders
const npm = 'node_modules';
const dist = 'assets';

// Vendors
const vendors = {
  js: [`${npm}/slick-carousel/slick/slick.min.js`],
};

function vendorJS(cb) {
  return src(vendors.js)
    .pipe(concat('vendor.js'))
    .pipe(dest(`${dist}/js`));
}

// Assets
const assets = {
  scss: 'src/scss/*.scss',
  js: ['src/js/main.js'],
};

function critical(cb) {
  return src('./assets/css/home.css')
    .pipe(
      criticalCss({
        out: 'critical.php', // output file name
        url: 'https://dev.downstage.com.br', // url from where we want penthouse to extract critical styles
        width: 1440, // max window width for critical media queries
        height: 1080, // max window height for critical media queries
        userAgent:
          'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', // pretend to be googlebot when grabbing critical page styles.
      })
    )
    .pipe(cleanCSS())
    .pipe(dest(`${dist}/css/criticalcss.php`));
}

function css(cb) {
  return src(assets.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        includePaths: ['node_modules'],
        outputStyle: 'compressed',
      }).on('error', sass.logError)
    )
    .pipe(sourcemaps.write())
    .pipe(cleanCSS())
    .pipe(postcss([precss, autoprefixer(), shortColor]))
    .pipe(dest(`${dist}/css`));
  cb();
}

const js = (cb) => {
  src(assets.js, {
    sourcemaps: false,
  })
    .pipe(rollup({ plugins: [babel(), resolve(), commonjs()] }, 'umd'))
    .pipe(
      uglify({
        mangle: true,
        compress: true,
      })
    )
    .pipe(dest(`${dist}/js`));
  cb();
};

// Watch
exports.watch = (cb) => {
  watch('src/scss/**/*.scss', parallel(css, critical));
  watch('src/js/**/*.js', js);
  cb();
};

exports.js = js;
exports.critical = critical;
exports.vendorJS = vendorJS;
exports.vendors = parallel(vendorJS);
exports.css = css;
exports.default = parallel(css, critical, vendorJS, js);
