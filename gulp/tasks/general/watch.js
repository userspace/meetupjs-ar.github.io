const gulp = require('gulp')

module.exports = function (config) {
    return function () {
        gulp.watch(config.watch.css, ['css-build','pwa-build'])
        gulp.watch(config.watch.html, ['html-build','pwa-build'])
        gulp.watch(config.watch.js, ['js-build','pwa-build'])
    }
}
