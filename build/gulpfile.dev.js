/**
 * Created by lenovo on 2017/12/21.
 */
let gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'), // 处理css中浏览器兼容的前缀
    rename = require('gulp-rename'), //重命名
    cssnano = require('gulp-cssnano'), // css的层级压缩合并
    sass = require('gulp-sass'), //sass
    jshint = require('gulp-jshint'), //js检查 ==> npm install --save-dev jshint gulp-jshint（.jshintrc：https://my.oschina.net/wjj328938669/blog/637433?p=1）
    uglify = require('gulp-uglify'), //js压缩
    concat = require('gulp-concat'), //合并文件
    imagemin = require('gulp-imagemin'), //图片压缩
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    Config = require('./gulpfile.config.js'),
    es2015 = require('babel-preset-es2015'),
    minifyCss = require('gulp-minify-css'), // CSS压缩
    babel = require('gulp-babel');
//======= gulp dev 开发环境下 ===============
function dev() {
    /**
     * HTML处理
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src)
            .pipe(gulp.dest(Config.html.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * assets文件夹下的所有文件处理
     */
    gulp.task('assets:dev', function () {
        return gulp.src(Config.assets.src)
            .pipe(gulp.dest(Config.assets.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * CSS样式处理
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src)
            .pipe(minifyCss())
            .pipe(rename({
                suffix: '.min'
            })) // 重命名
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(gulp.dest(Config.css.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * SASS样式处理
     */
    gulp.task('sass:dev', function () {
        return gulp.src(Config.sass.src)
            .pipe(concat(Config.sass.build_name))
            .pipe(sass())
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(minifyCss())
            .pipe(rename({
                suffix: '.min'
            })) // 重命名
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * js处理
     */
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src)
            .pipe(babel({
                presets: [es2015]
            }))
            .pipe(jshint('.jshintrc'))
            .pipe(rename({
                suffix: '.min'
            })) // 重命名
            .pipe(uglify()) // 使用uglify进行压缩，并保留部分注释
            .pipe(jshint.reporter('default'))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * 合并所有js文件并做压缩处理
     */
    gulp.task('js-concat:dev', function () {
        return gulp.src(Config.js.src)
            .pipe(concat(Config.js.build_name))
            .pipe(babel({
                presets: [es2015]
            }))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            // .pipe(rev())
            .pipe(gulp.dest(Config.js.dist));

        // gp.src(['1.js', '2.js']).pipe(concat('main.js')).pipe(uglify()).pipe(gp.dest('./dest/js'));
    });
    /**
     * vendor处理
     */
    gulp.task('vendor:dev', function () {
        return gulp.src(Config.vendor.src)
            .pipe(babel({
                presets: [es2015]
            }))
            .pipe(jshint('.jshintrc'))
            .pipe(rename({
                suffix: '.min'
            })) // 重命名
            .pipe(uglify()) // 使用uglify进行压缩，并保留部分注释
            .pipe(jshint.reporter('default'))
            .pipe(gulp.dest(Config.vendor.dist))
            .pipe(reload({
                stream: true
            }));
    });
    /**
     * 图片处理
     */
    gulp.task('images:dev', function () {
        return gulp.src(Config.img.src)
            .pipe(imagemin({
                optimizationLevel: 3,
                progressive: true,
                interlaced: true
            })).pipe(gulp.dest(Config.img.dist))
            .pipe(reload({
                stream: true
            }));
    });
    gulp.task('dev', ['html:dev', 'css:dev', 'sass:dev', 'js:dev', 'js-concat:dev', 'assets:dev', 'images:dev'], function () {
        browserSync.init({
            server: {
                baseDir: Config.dist
            },
            notify: false
        });
        // Watch .html files
        gulp.watch(Config.html.src, ['html:dev']);
        // Watch .css files
        gulp.watch(Config.css.src, ['css:dev']);
        // Watch .scss files
        gulp.watch(Config.sass.src, ['sass:dev']);
        // Watch assets files
        gulp.watch(Config.assets.src, ['assets:dev']);
        //Watch vendor files
        gulp.watch(Config.vendor.src, ['vendor:dev']);
        // Watch .js files
        gulp.watch(Config.js.src, ['js-concat:dev']);
        // Watch .js files
        gulp.watch(Config.js.src, ['js:dev']);
        // Watch image files
        gulp.watch(Config.img.src, ['images:dev']);

    });
}
//======= gulp dev 开发环境下 ===============
module.exports = dev;