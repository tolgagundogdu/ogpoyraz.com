var path = require('path'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    strip = require('gulp-strip-comments'),
    foreach = require('gulp-foreach'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCss = require('gulp-minify-css');


var pluginSrc = 'bower_components/',
    pluginSrcCustom = 'content/custom-plugins/',
    pluginSrcAllJs = [pluginSrc + 'jquery/dist/jquery.min.js', pluginSrc + 'modernizr/modernizr.js', pluginSrc + 'blockui/jquery.blockUI.js',pluginSrc + 'stats.js/build/stats.min.js',pluginSrc + 'jquery-validation/dist/jquery.validate.min.js'],
    pluginSrcAllCss = [];

var customSrc = 'content/',
    customSrcJs = customSrc + 'js/',
    customSrcSass = customSrc + 'sass/',
    customSrcAllJs = [customSrcJs + 'main.js'];

var destSrc = {
    styles: 'public/stylesheets/',
    scripts: 'public/javascripts/',
    images: 'public/images/'
};

/*
 * -------------------------------
 * BOWER DEPENDENCY / PLUGIN TASKS
 * -------------------------------
 *
 * If we add new plugin we should just run
 * Note: Dont forget to add plugin source to pluginSrcAllCss,pluginSrcAllJs variables before run these commands.
 * 
 *      gulp plugin-scripts
 *      gulp plugin-styles
 * 
 */

// Bower dependencies js sources to public/javascripts/plugins.min.js (TEST = OK)
gulp.task('plugin-scripts', function() {
    return gulp.src(pluginSrcAllJs)
        .pipe(concat('plugins.min.js'))
        .pipe(strip())
        .pipe(gulp.dest(destSrc.scripts));
});

// Bower dependencies css sources to public/javascripts/plugins.min.js (TEST = OK)
gulp.task('plugin-styles', function() {
    return gulp.src(pluginSrcAllCss)
        .pipe(concat('plugins.min.css'))
        .pipe(minifyCss())
        .pipe(strip())
        .pipe(gulp.dest(destSrc.styles));
});

/*
 * ---------------
 * CUSTOM JS TASKS
 * ---------------
 * 
 * Custom js files seperated 2 type of compile type. 
 * Page spesific js files compiling to public/javascripts/pages/page.js for each page.
 * Main js file compiling to public/javascripts/main.js.
 *
 * For production level js(minified versions of scripts) source you should use 
 *
 *      gulp prod-js-pages
 *      gulp prod-js-main
 *      
 */

// Custom written pages js sources to public/javascripts/pages/page.js (TEST = OK)
gulp.task('dev-js-pages', function() {
    return gulp.src(customSrcJs + 'pages/*.js')
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(strip())
        }))
        .pipe(gulp.dest(destSrc.scripts + '/pages/'));
});

// Production Level Task : Custom written pages js sources to public/javascripts/pages/page.min.js (TEST = OK)
gulp.task('prod-js-pages', function() {
    return gulp.src(customSrcJs + 'pages/*.js')
        .pipe(foreach(function(stream, file) {
            return stream
                .pipe(strip())
                .pipe(uglify())
        }))
        .pipe(rename(function(path) {
            path.extname = ".min.js"
        }))
        .pipe(gulp.dest(destSrc.scripts + '/pages/'));
});

// Custom written main js source to public/javascripts/main.js (TEST = OK)
gulp.task('dev-js-main', function() {
    return gulp.src(customSrcAllJs)
        .pipe(concat('main.js'))
        .pipe(strip())
        .pipe(gulp.dest(destSrc.scripts));
});

// Production Level Task : Custom written main js source to public/javascripts/main.min.js (TEST = OK)
gulp.task('prod-js-pages', function() {
    return gulp.src(customSrcAllJs)
        .pipe(concat('main.min.js'))
        .pipe(strip())
        .pipe(uglify())
        .pipe(gulp.dest(destSrc.scripts));
});

/*
 *  ------------------------
 *  CUSTOM SASS COMPILE TASK
 *  ------------------------
 *  
 *  Note : All files inside content/sass importing to main.scss.
 *  So in this case we'll just compile our main.scss to public/stylesheets/main.min.css.
 *  
 */

gulp.task('prod-scss-main', function() {
    gulp.src(customSrcSass + 'main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(strip())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rename(function(path) {
            path.extname = ".min.css"
        }))
        .pipe(gulp.dest(destSrc.styles))
});

/*
 *  --------
 *  WATCHERS 
 *  --------
 *
 *  Use 'gulp development' for development phase. 
 *
 */

// Main javascripts
gulp.task('watch-dev-js-main', function() {
    gulp.watch(customSrcJs + 'main.js', ['dev-js-main']);
});

// Custom javascripts
gulp.task('watch-dev-js-pages', function() {
    gulp.watch(customSrcJs + 'pages/*.js', ['dev-js-pages']);
});

// Custom Scss
gulp.task('watch-dev-scss', function() {
    gulp.watch(customSrcSass + '**', ['prod-scss-main']);
});

//Development Task
gulp.task('development', function() {
    gulp.start('watch-dev-js-pages', 'watch-dev-js-main', 'watch-dev-scss');
});
