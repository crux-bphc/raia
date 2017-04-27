var path = require('path');
var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var gulpLoadPlugins = require('gulp-load-plugins');
var pkg = require('./package.json');

const $ = gulpLoadPlugins();

gulp.task('clean', () => del(['temp', 'dist', '!dist/.git'], {dot: true}));

// Compile and automatically prefix stylesheets
gulp.task('styles', () => {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src([
    'lib/css/**/*.css',
    'src/css/**/*.css'
  ])
    .pipe($.newer('temp/css'))
    // .pipe($.sourcemaps.init())
    // .pipe($.sass({
    //   precision: 10
    // }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('temp/css'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    // .pipe($.sourcemaps.write('./'))
    .pipe($.concat('main.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(gulp.dest('temp/css'));
});

gulp.task('scripts', () =>
    gulp.src([
      // Note: Since we are not using useref in the scripts build pipeline,
      //       you need to explicitly list your scripts here in the right order
      //       to be correctly concatenated
      'lib/js/markdown-it.js',
      'lib/js/markdown-it-footnote.js',
      'lib/js/highlight.pack.js',
      'src/js/interface.js',
      'src/js/events.js',
      'src/js/loader.js',
      'src/js/index.js'
      // Other scripts
    ])
      .pipe($.concat('temp.js'))
      .pipe(gulp.dest('temp/js'))
      .pipe($.rename('main.min.js'))
      .pipe($.uglify())
      .pipe($.size({title: 'scripts'}))
      .pipe(gulp.dest('dist/js'))
);

// Scan your HTML for assets & optimize them
gulp.task('html', () => {
  return gulp.src('src/**/*.html')
    // Minify any HTML
    .pipe($.useref())
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      removeAttributeQuotes: true,
      removeRedundantAttributes: true,
      removeEmptyAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeOptionalTags: true
    })))
    // Output files
    .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('lint', () =>
  gulp.src(['src/js/**/*.js','!node_modules/**'])
    .pipe($.eslint())
);

gulp.task('default', ['clean'], cb =>
  runSequence(
    'html',
    'styles',
    'scripts',
    cb
  )
);