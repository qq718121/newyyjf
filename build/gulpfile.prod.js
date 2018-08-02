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
    sourcemaps = require('gulp-sourcemaps'), // 来源地图
    babel = require('gulp-babel'),
    es2015 = require('babel-preset-es2015'),
    changed = require('gulp-changed'),
    pngquant = require('gulp-pngquant'), //深度压缩
    rev = require('gulp-rev'), //- 对css、js文件名加MD5后缀
    Config = require('./gulpfile.config.js');

//======= gulp build 打包资源 ===============
function prod() {
    /**
     * HTML处理
     */
    gulp.task('html', function () {
        return gulp.src(Config.html.src)
            .pipe(gulp.dest(Config.html.dist));
    });
    gulp.task('xml', function () {
        return gulp.src(Config.xml.src)
            .pipe(gulp.dest(Config.xml.dist));
    });
    /**
     * assets文件夹下的所有文件处理
     */
    gulp.task('assets', function () {
        return gulp.src(Config.assets.src)
            .pipe(gulp.dest(Config.assets.dist));
    });
    /**
     * CSS样式处理
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src)
            .pipe(autoprefixer({
                browsers: ['last 2 versions', 'Android >= 4.0'],
                cascade: true, //是否美化属性值 默认：true 像这样：
                //-webkit-transform: rotate(45deg);
                //        transform: rotate(45deg);
                remove: true //是否去掉不必要的前缀 默认：true
            }))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(cssnano()) //执行压缩
            .pipe(gulp.dest(Config.css.dist));
    });
    /**
     * SASS样式处理
     */
    gulp.task('sass', function () {
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
            .pipe(rename({
                suffix: '.min'
            })) //rename压缩后的文件名
            .pipe(cssnano()) //执行压缩
            .pipe(gulp.dest(Config.sass.dist));
    });
    /**
     * js处理
     */

    gulp.task('js', function () {
        return gulp.src([Config.js.src])
        // .pipe(sourcemaps.init()) // 执行sourcemaps
            .pipe(babel({
                presets: [es2015]
            }))
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(uglify({
                mangle: {
                    except: ['require', 'exports', 'module', '$']
                }
            }))
            // .pipe(rev())
            // .pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置)
            .pipe(gulp.dest(Config.js.dist));
    });

    /**
     * vendor处理
     */
    gulp.task('vendor', function () {
        return gulp.src([Config.vendor.src])
        // .pipe(sourcemaps.init()) // 执行sourcemaps
        // .pipe(babel({
        //     presets: [es2015]
        // }))
        // .pipe(jshint('.jshintrc'))
        // .pipe(jshint.reporter('default'))
            .pipe(rename({
                suffix: '.min'
            }))
            // .pipe(uglify({
            //     mangle: {
            //         except: ['require', 'exports', 'module', '$']
            //     }
            // }))
            // .pipe(rev())
            // .pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置)
            .pipe(gulp.dest(Config.vendor.dist));
    });
    /**
     * 合并所有js文件并做压缩处理
     */
    gulp.task('js-concat', function () {
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
     * 图片处理
     */
    gulp.task('images', function () {
        return gulp.src(Config.img.src)
            .pipe(changed(Config.img.dist)) // 对比文件是否有过改动（此处填写的路径和输出路径保持一致）
            .pipe(imagemin({
                progressive: true, // 无损压缩JPG图片
                svgoPlugins: [{
                    removeViewBox: false
                }], // 不移除svg的viewbox属性
                use: [pngquant()] // 使用pngquant插件进行深度压缩
            }))
            // .pipe(rev())
            .pipe(gulp.dest(Config.img.dist));
    });
    /**
     * 图片处理
     */
    gulp.task('ckPlayer', function () {
        return gulp.src(Config.ckPlayer.src)
            .pipe(changed(Config.ckPlayer.dist)) // 对比文件是否有过改动（此处填写的路径和输出路径保持一致）
            .pipe(gulp.dest(Config.ckPlayer.dist));
    });
    /**
     * 图片处理
     */
    gulp.task('webGl', function () {
        return gulp.src(Config.webGl.src)
            .pipe(changed(Config.webGl.dist)) // 对比文件是否有过改动（此处填写的路径和输出路径保持一致）
            .pipe(gulp.dest(Config.webGl.dist));
    });
    gulp.task('build', ['html', 'css', 'sass', 'assets', 'images', 'js', 'vendor', 'js-concat', 'ckPlayer', 'webGl','xml']);
}
module.exports = prod;