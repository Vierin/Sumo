import gulp from "gulp";
import { path } from "./gulp/path.js";
import { plugins } from "./gulp/plugins.js";

// Передаем значения в глобальную переменную
global.app = {
	isBuild: process.argv.includes('--build'),
	isDev: !process.argv.includes('--build'),
	path: path,
	gulp: gulp,
	plugins: plugins
}

// Импорт задач
import { html, reset, server, scss, js, images, convertFonts, insertSVGs, imageWebp, video } from "./gulp/tasks.js";

// Наблюдатель за изменениями в файлах
function watcher() {
	gulp.watch(path.watch.html, html);
	gulp.watch(path.watch.scss, scss);
	gulp.watch(path.watch.js, js);
	gulp.watch(path.watch.images, images);
}


// Основные задачи
const mainTasks = gulp.series(gulp.parallel(html, scss, js, imageWebp, images));

// Построение сценариев выполнения задач
const dev = gulp.series(reset, mainTasks, video, gulp.parallel(watcher, server));
const build = gulp.series(reset, imageWebp, mainTasks);
const fonts = gulp.series(convertFonts);
const media = gulp.series(imageWebp, images, video);

// Экспорт сценариев
export { dev }
export { build }
export { fonts }
export { media }

gulp.task('default', dev);