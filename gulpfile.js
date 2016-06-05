var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
var psi = require('psi');

var path = {
    DEV: 'starter.dev', // example: name.dev
    ASSETS: 'resources',
    DEST: 'public',
    SASS_SRC: 'resources/sass/*.sass',
    SASS_DEST: 'public/css',
    IMG_SRC: 'resources/images/*',
    IMG_DEST: 'public/images',
    JS_SRC: 'resources/js/',
    JS_DEST: 'public/js',
    CSS_SRC: 'public/css/*.css',
    CSS_DEST: 'public/css/',
    FONTS_SRC: 'resources/fonts/**/*',
    FONTS_DEST: 'public/fonts'
};

gulp.task('sass', function () {
    return gulp.src(path.SASS_SRC)
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: [
                'ie >= 10',
                'ie_mob >= 10',
                'ff >= 30',
                'chrome >= 34',
                'safari >= 7',
                'opera >= 23',
                'ios >= 7',
                'android >= 4.4',
                'bb >= 10'
            ],
            cascade: false
        }))
        .pipe(minifyCSS({
            keepSpecialComments: 1
        }))
        .pipe(size())
        .pipe(gulp.dest(path.SASS_DEST));
});
gulp.task('images', function () {
    return gulp.src(path.IMG_SRC)
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(size())
        .pipe(gulp.dest(path.IMG_DEST));
});
gulp.task('js', function() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            path.JS_SRC + '/vendor/*.js',
            path.JS_SRC + '/main.js'
        ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest(path.JS_DEST));
});
gulp.task('fonts', function() {
    return gulp.src(path.FONTS_SRC)
        .pipe(size())
        .pipe(gulp.dest(path.FONTS_DEST));
});
gulp.task('watch', function () {
    browserSync({
        server: {
            proxy: path.DEV
        }
    });
    gulp.watch(path.ASSETS + '/sass/**/*', ['sass']);
    gulp.watch(path.ASSETS + '/sass/**/*').on('change', browserSync.reload);
    gulp.watch(path.ASSETS + '/images/**/*', ['images']);
    gulp.watch(path.ASSETS + '/images/**/*').on('change', browserSync.reload);
    gulp.watch(path.ASSETS + '/js/**/*', ['js']);
    gulp.watch(path.ASSETS + '/js/**/*').on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);

});

gulp.task('default', ['sass', 'js', 'images', 'fonts']);