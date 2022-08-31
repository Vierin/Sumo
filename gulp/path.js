// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`; // Также можно использовать rootFolder
const srcFolder = `./src`;

export const path = {
	build: {
		js: `${buildFolder}/js/`,
		css: `${buildFolder}/css/`,
		html: `${buildFolder}/`,
		images: `${buildFolder}/media/`,
		video: `${buildFolder}/media/`
	},
	src: {
		js: `${srcFolder}/js/app.js`,
		images: `${srcFolder}/media/**/*.{jpg,jpeg,png,gif,webp}`,
		video: `${srcFolder}/media/*.mp4`,
		svg: `${srcFolder}/media/**/*.svg`,
		svgSet: `${srcFolder}/media/svg/`,
		scss: `${srcFolder}/scss/main.scss`,
		html: `${srcFolder}/*.html`,
		fonts: `${srcFolder}/fonts/`,
		fonts64: `${srcFolder}/scss/fonts/`
	},
	watch: {
		js: `${srcFolder}/js/**/*.js`,
		scss: `${srcFolder}/scss/**/*.scss`,
		html: `${srcFolder}/**/*.html`,
		images: `${srcFolder}/media/**/*.{jpg,png,svg,gif,webp}`
	},
	clean: buildFolder,
	buildFolder: buildFolder,
	srcFolder: srcFolder,
	rootFolder: rootFolder
}