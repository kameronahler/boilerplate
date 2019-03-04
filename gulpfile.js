// npm install --save-dev gulp gulp-sass gulp-postcss autoprefixer postcss-pxtorem cssnano gulp-uglify gulp-concat browser-sync

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    postcssautoprefixer = require('autoprefixer'),
    postcsspxtorem = require('postcss-pxtorem'),
    postcsscssnano = require('cssnano'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    browserSync = require('browser-sync');

gulp.task('sass', function() {
    var plugins = [
        postcssautoprefixer({
                browsers: ['last 2 versions', '> .5% in US']
            }),
        postcsspxtorem({
            rootValue:16,
            unitPrecision:5,
            propList:['*'],
            replace:false
            }),
        postcsscssnano({
            calc: false,
            colorMin: false,
            convertValues: false,
            discardUnused: false,
            zindex: false,
            reduceIdents: false,
            mergeIdents: false,
            minifySelectors: false,
            minifyFontValues: false,
            normalizeUrl: false,
            safe: true,
            mergeRules: true
            })
    ];

    return gulp.src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('js', function() {
    return gulp.src(['src/js/**/*.js'])
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', function(done) {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    done();
});

gulp.task('browserSyncReload', function(done) {
    browserSync.reload();
    done();
});

gulp.task('watch', gulp.series(['sass', 'js', 'browserSync','browserSyncReload'], function() {
    browserSync;
    gulp.watch('src/**/*.scss', gulp.parallel(['sass']));
    gulp.watch('src/js/**/*.js', gulp.parallel(['js']));
    gulp.watch('./**/*.html', gulp.parallel(['browserSyncReload']));
}));

gulp.task('default', gulp.series('sass','js'));





