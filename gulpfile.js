const gulp = require('gulp'),
    zip = require('gulp-zip'),
    sass = require('gulp-sass'),
    minify = require('gulp-minifier'),
    postcss = require('gulp-postcss'),
    tailwindcss = require('tailwindcss'),
    sourcemaps = require('gulp-sourcemaps'),
    replace = require('gulp-string-replace'),
    inlinesource = require('gulp-inline-source')
autoprefixer = require("autoprefixer"),
    chokidar = require('chokidar');

sass.compiler = require('node-sass');

gulp.task('env:production', done => {
    process.env.NODE_ENV = 'production';
    done();
})

gulp.task('sass:main-style', () => {
    return gulp.src('assets/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([tailwindcss(), autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'))
})
gulp.task('sass:inline-style', () => {
    return gulp.src('assets/sass/inline.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([tailwindcss(), autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'))
})

gulp.task('sass', gulp.parallel('sass:inline-style', 'sass:main-style'))
/*
gulp.task('sass:inject-built-inline-style', () => {
    return gulp.src('assets/built/css/inline.css')
        .pipe(rename({
            dirname: 'partials',
            basename: 'inline-style',
            extname: '.hbs'
        }))
        .pipe(header('<style>'))
        .pipe(footer(('</style>')))
        .pipe(gulp.dest('.'))
})
gulp.task('sass:inject-dev-inline-style', () => {
    return gulp.src('assets/css/inline.css')
        .pipe(rename({
            dirname: 'partials',
            basename: 'inline-style',
            extname: '.hbs'
        }))
        .pipe(header('<style>'))
        .pipe(footer(('</style>')))
        .pipe(gulp.dest('.'))
})
*/
gulp.task('minify', () => {
    return gulp.src('assets/**/*')
                .pipe(minify({
                    minify: true,
                    minifyHTML: false,
                    minifyJS: {
                        sourceMap: false,
                    },
                    minifyCSS: true
                }))
                .pipe(gulp.dest('assets/built'))
})
gulp.task('use-built-assets', () => gulp.src('./**/*.hbs')
    .pipe(replace(`/css/`, `/built/css/`))
    .pipe(replace(`/js/`, `/built/js/`))
    .pipe(gulp.dest('.'))
)
gulp.task('use-dev-assets', () => gulp.src('./**/*.hbs')
    .pipe(replace(`/built/css/`, `/css/`))
    .pipe(replace(`/built/js/`, `/js/`))
    .pipe(gulp.dest('.'))
)
gulp.task('inline-sources', () => gulp.src('./**/*.hbs')
    .pipe(inlinesource())
    .pipe(gulp.dest('.'))
)
gulp.task('build', gulp.series('env:production', 'sass', 'minify', 'use-built-assets', 'inline-sources'))

gulp.task('package', gulp.series('build', () => {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**',
        '!*.config.js',
        '!.gitignore',
        '!yarn.lock',
        '!assets/sass', '!assets/sass/**',
        '!assets/css', '!assets/css',
        '!assets/js', '!assets/js',
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
}))
gulp.task('default', (done) => {
    gulp.watch('assets/sass/**/*', { usePolling: true, ignoreInitial: false, interval: 1000, binaryInterval: 1000  }, gulp.series('sass'))
})