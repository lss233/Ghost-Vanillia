const gulp = require('gulp'),
    zip = require('gulp-zip'),
    sass = require('gulp-sass'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    tailwindcss = require('tailwindcss'),
    sourcemaps = require('gulp-sourcemaps')
autoprefixer = require("autoprefixer"),
    chokidar = require('chokidar');

sass.compiler = require('node-sass');

gulp.task('sass:main-style', () => {
    return gulp.src('assets/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([tailwindcss(), autoprefixer()]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css'))
})
gulp.task('sass:inline-style', () => {
    return gulp.src('assets/sass/inline.scss')
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(postcss([tailwindcss(), autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('assets/css'))
        .pipe(gulp.src('assets/css/inline.css'))
        .pipe(rename({
            dirname: 'partials',
            basename: 'inline-style',
            extname: '.hbs'
        }))
        .pipe(header('<style>'))
        .pipe(footer(('</style>')))
        .pipe(gulp.dest('.'))
})
gulp.task('sass', gulp.parallel('sass:inline-style', 'sass:main-style'))

gulp.task('zip', gulp.series('sass', () => {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
}))

gulp.task('default', gulp.series(() => {
    console.log('Watching files...')
    chokidar.watch('assets/css/inline.css', { usePolling: true }).on('change', (e) => {
        console.log(e)
        gulp.src('assets/css/inline.css')
            .pipe(rename({
                dirname: 'partials',
                basename: 'inline-style',
                extname: '.hbs'
            }))
            .pipe(header('<style>\n'))
            .pipe(footer(('\n</style>')))
            .pipe(gulp.dest('.'))
    })
    chokidar.watch('./assets/sass/', { usePolling: true }).on('change', (e) => {
        console.log(e)
        gulp.parallel('sass')
        gulp.src('assets/sass/inline.scss')
            .pipe(sourcemaps.init())
            .pipe(sass.sync().on('error', sass.logError))
            .pipe(postcss([tailwindcss(), autoprefixer()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('assets/css'))
        gulp.src('assets/sass/main.scss')
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(postcss([tailwindcss(), autoprefixer()]))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('assets/css'))
    })
}));
