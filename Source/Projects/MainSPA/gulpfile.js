var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;
var ngAnnotate = require('gulp-ng-annotate');
var pump = require('pump');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");

gulp.task('production', function (cb) {
    gulp.src(['./dist/inline.*.bundle.js',
            './dist/polyfills.*.bundle.js',
            './dist/main.*.bundle.js',
            './dist/assets/vendors/base/vendors.bundle.js',
            './dist/assets/demo/default/base/scripts.bundle.js',
            './dist/**/*.js'
        ])
        .pipe(concat('app.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./app/'));

    gulp.src(['./dist/**/vendors.bundle.css',
            './dist/**/style.bundle.css',
            './dist/**/*.css'
        ])
        .pipe(concat('app.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./app/'));

    gulp.src(['./dist/assets/**/*.{gif,jpg,png,svg}'])
        .pipe(gulp.dest('./app/assets'));

    gulp.src(['./dist/assets/app/js/**/*.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./app/assets/app/js'));

    gulp.src(['./dist/assets/vendors/base/fonts/**/*.{tff,woff,woff2}'])
        .pipe(gulp.dest('./app/fonts'));

    gulp.src(['./src/index-prod.html'])
        .pipe(rename("index.html"))
        .pipe(gulp.dest('./app'));
});