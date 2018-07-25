// /**
//  * Created by lenovo on 2017/12/21.
//  */
// let gulp = require('gulp');
// let mkdirp = require('mkdirp');
// let Config = require('./gulpfile.config.js');
// //======= gulp init 初始化项目结构 ===============
// function init() {
//     /**
//      * 初始化项目结构
//      */
//     gulp.task('init', function () {
//         let dirs = [Config.html.dir, Config.assets.dir, Config.css.dir, Config.sass.dir, Config.js.dir, Config.img.dir];
//         dirs.forEach(dir => {
//             mkdirp.sync(dir);
//         });
//     });
// }
// module.exports = init;