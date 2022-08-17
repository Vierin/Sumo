//html
import fileInclude from "gulp-file-include";
import webphtml from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import injectSvg from "gulp-inject-svg";

export const html = () => {
	return app.gulp.src(app.path.src.html)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "HTML",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(fileInclude())
		.pipe(app.plugins.replace(/@media\//g, './media/'))
		.pipe(
			app.plugins.if(
				app.isBuild,
				webphtml()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				versionNumber({
					'value': '%DT%',
					'append': {
						'key': '_v',
						'cover': 0,
						'to': [
							'css',
							'js',
						]
					},
					'output': {
						'file': 'gulp/version.json'
					}
				})
			)
		)
		.pipe(injectSvg({ base: app.path.src.svgSet }))
		.pipe(app.gulp.dest(app.path.build.html))
		.pipe(app.plugins.browsersync.stream());
}

//images
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

export const imageWebp = async () => {
	await imagemin([app.path.src.images], {
		destination: app.path.build.images,
		plugins: [
			imageminWebp({quality: 50})
		]
	});

	console.log('Images optimized');
};


//images move
import webp from "gulp-webp";
import imageminGulp from "gulp-imagemin";

export const images = () => {
	return app.gulp.src(app.path.src.images)
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "IMAGES",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(app.plugins.newer(app.path.build.images))
		.pipe(
			app.plugins.if(
				app.isBuild,
				webp()
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				app.gulp.dest(app.path.build.images)
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				app.gulp.src(app.path.src.images)
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				app.plugins.newer(app.path.build.images)
			)
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				imageminGulp({
					progressive: true,
					svgoPlugins: [{ removeViewBox: false }],
					interlaced: true,
					optimizationLevel: 3 // 0 to 7
				})
			)
		)
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.gulp.src(app.path.src.svg))
		.pipe(app.gulp.dest(app.path.build.images))
		.pipe(app.plugins.browsersync.stream());
}

//js
import webpack from "webpack-stream";

export const js = () => {
	return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "JS",
				message: "Error: <%= error.message %>"
			}))
		)
		.pipe(webpack({
			mode: app.isBuild ? 'production' : 'development',
			output: {
				filename: 'app.min.js',
			}
		}))
		.pipe(app.gulp.dest(app.path.build.js))
		.pipe(app.plugins.browsersync.stream());
}

//reset
import { deleteAsync } from "del";
export const reset = () => {
	return deleteAsync([`${app.path.clean}/*`]);
}

//scss
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

const sass = gulpSass(dartSass);

export const scss = () => {
	return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "SCSS",
				message: "Error: <%= error.message %>"
			})))
		.pipe(sass({
			outputStyle: 'expanded'
		}))
		.pipe(app.plugins.replace(/@media\//g, '../media/'))
		.pipe(
			app.plugins.if(
				app.isBuild,
				groupCssMediaQueries()
			)
		)
		.pipe(
			autoprefixer({
				grid: true,
				overrideBrowserslist: ["last 3 versions"],
				cascade: false
			})
		)
		.pipe(
			app.plugins.if(
				app.isBuild,
				webpcss(
					{
						webpClass: ".webp",
						noWebpClass: ".no-webp"
					}
				)
			)
		)
		// Раскомментировать если нужен не сжатый дубль файла стилей
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(
			app.plugins.if(
				app.isBuild,
				cleanCss()
			)
		)
		.pipe(rename({
			extname: ".min.css"
		}))
		.pipe(app.gulp.dest(app.path.build.css))
		.pipe(app.plugins.browsersync.stream());
}

//server
export const server = (done) => {
	app.plugins.browsersync.init({
		server: {
			baseDir: `${app.path.build.html}`
		},
		notify: false,
		port: 3000,
	});
}

// Convert fonts
import inlineFonts from 'gulp-inline-fonts';
import merge from 'merge-stream';
import fileNames from 'gulp-filenames';
import * as fs from 'fs';

export const convertFonts = async () => {
    const fontStream = merge();
    let name;
    let type;
    let weight;
    let isItalic;

    const fontFormats = ['woff', 'ttf', 'otf', 'woff2'];

    app.gulp.src(`${app.path.src.fonts}/*.*`)
        .pipe(fileNames('fonts'))
        .on('end', () => {
            const files = fileNames.get('fonts');

            files.forEach(file => {
                const split = file.split('.');
                [name, weight, type] = split;

                fontFormats.forEach(f => {
                    if (f === type) {
                        const style = weight.split('-');

                        [weight, isItalic] = style;

                        fontStream.add(app.gulp.src(`${app.path.src.fonts}/${name}.${weight}${isItalic ? '-i' : ''}.${f}`)
                            .pipe(inlineFonts({ name, weight, formats: [f], style: isItalic ? 'italic' : 'normal' })));

                    }
                });


            });

        })
        .pipe((app.gulp.dest(app.path.src.fonts)));

    return fontStream.pipe(app.plugins.concat('fonts.scss')).pipe(app.gulp.dest(app.path.src.fonts64));

}

//convert svg
export const insertSVGs = () => {
    const distFiles = app.path.src.html;
    const svgPattern = /\[\[svg::([0-9a-z-_]+)\]\]/gm;
    const spritePattern = /\[\[sprite::([0-9a-z-_]+)\]\]/gm;

    return Promise.all(


        distFiles.map(file => new Promise(resolve => {
            try {
                fs.readFile(
                    `${srcFolder}/${file}.html`,
                    'utf-8',
                    (error, html) => {
                        let match;
                        const svgMatches = [];
                        const spriteMatches = [];

                        while ((match = svgPattern.exec(html))) {
                            svgMatches.push(match[1]);
                        }

                        while ((match = spritePattern.exec(html))) {
                            spriteMatches.push(match[1]);
                        }

                        Promise.all(
                            svgMatches
                                .map(name => new Promise((resolve, reject) => {
                                    fs.readFile(
                                        `${paths.svg.dest + name}.svg`,
                                        'utf-8',
                                        (error, svg) => {
                                            if (svg) {
                                                html = html.replace(
                                                    `[[svg::${name}]]`,
                                                    svg.replace('<svg ', `<svg class="svg-${name}" `)
                                                );
                                            } else {
                                                html = html.replace(`[[svg::${name}]]`, '');
                                                if (name !== 'sprite') {
                                                    console.log(`svg '${name}' — not found!`);
                                                }
                                            }
                                            resolve();
                                        }
                                    );
                                }))
                                .concat(
                                    spriteMatches.map(name => new Promise((resolve, reject) => {
                                        html = html.replace(
                                            `[[sprite::${name}]]`,
                                            `<svg class="sprite-${name}"><use xlink:href="#sprite-${name}"/></svg>`
                                        );
                                        resolve();
                                    }))
                                )
                        ).then(() => {
                            fs.writeFileSync(`${buildFolder}/${file}.html`, html);
                            resolve();
                        });
                    }
                );
            } catch (error) {
                return null;
            }
        }))
    );
}